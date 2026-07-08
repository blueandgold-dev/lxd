"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { createEmptyCounts, type ReactionCounts, type ReactionMap, type ReactionType } from "@/lib/reaction-types";

type UserReactionMap = Record<string, ReactionType | undefined>;

type ReactionsContextValue = {
  counts: ReactionMap;
  userReactions: UserReactionMap;
  isReady: boolean;
  reactToPost: (slug: string, nextReaction: ReactionType | null) => Promise<void>;
};

const ReactionsContext = createContext<ReactionsContextValue | null>(null);
const STORAGE_KEY = "lxd-post-reactions";
const STORAGE_CHANGE_EVENT = "lxd-post-reactions-change";
const EMPTY_USER_REACTIONS: UserReactionMap = {};

let cachedStoredValue: string | null = null;
let cachedUserReactions: UserReactionMap = EMPTY_USER_REACTIONS;

function adjustCounts(counts: ReactionCounts, previousReaction: ReactionType | null, nextReaction: ReactionType | null) {
  const nextCounts = { ...counts };

  if (previousReaction) {
    nextCounts[previousReaction] = Math.max(0, nextCounts[previousReaction] - 1);
  }

  if (nextReaction) {
    nextCounts[nextReaction] += 1;
  }

  return nextCounts;
}

function readStoredReactions(): UserReactionMap {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return {};
    }

    return JSON.parse(storedValue) as UserReactionMap;
  } catch {
    return {};
  }
}

function getStoredReactionsSnapshot(): UserReactionMap {
  if (typeof window === "undefined") {
    return EMPTY_USER_REACTIONS;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (storedValue === cachedStoredValue) {
    return cachedUserReactions;
  }

  cachedStoredValue = storedValue;
  cachedUserReactions = readStoredReactions();

  return cachedUserReactions;
}

function getServerStoredReactionsSnapshot(): UserReactionMap {
  return EMPTY_USER_REACTIONS;
}

function subscribeToStoredReactions(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_CHANGE_EVENT, onStoreChange);
  };
}

function storeReactions(reactions: UserReactionMap) {
  const serializedReactions = JSON.stringify(reactions);

  cachedStoredValue = serializedReactions;
  cachedUserReactions = reactions;
  window.localStorage.setItem(STORAGE_KEY, serializedReactions);
  window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
}

export function ReactionsProvider({ children }: { children: ReactNode }) {
  const [counts, setCounts] = useState<ReactionMap>({});
  const userReactions = useSyncExternalStore(subscribeToStoredReactions, getStoredReactionsSnapshot, getServerStoredReactionsSnapshot);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCounts() {
      try {
        const response = await fetch("/api/reactions", { cache: "no-store" });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { counts?: ReactionMap };

        if (isMounted) {
          setCounts(payload.counts ?? {});
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    void loadCounts();

    return () => {
      isMounted = false;
    };
  }, []);

  const reactToPost = useCallback(
    async (slug: string, nextReaction: ReactionType | null) => {
      const previousReaction = userReactions[slug] ?? null;

      if (previousReaction === nextReaction) {
        return;
      }

      const previousCounts = counts[slug] ?? createEmptyCounts();
      const optimisticCounts = adjustCounts(previousCounts, previousReaction, nextReaction);
      const nextUserReactions = {
        ...userReactions,
        [slug]: nextReaction ?? undefined,
      };

      setCounts((currentCounts) => ({
        ...currentCounts,
        [slug]: adjustCounts(currentCounts[slug] ?? createEmptyCounts(), previousReaction, nextReaction),
      }));
      storeReactions(nextUserReactions);

      try {
        const response = await fetch("/api/reactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            slug,
            previousReaction,
            nextReaction,
          }),
        });

        if (!response.ok) {
          throw new Error("Unable to save reaction.");
        }

        const payload = (await response.json()) as { counts?: ReactionCounts };

        if (payload.counts) {
          setCounts((currentCounts) => ({
            ...currentCounts,
            [slug]: payload.counts ?? optimisticCounts,
          }));
        }
      } catch {
        const revertedUserReactions = {
          ...userReactions,
          [slug]: previousReaction ?? undefined,
        };

        setCounts((currentCounts) => ({
          ...currentCounts,
          [slug]: previousCounts,
        }));
        storeReactions(revertedUserReactions);
      }
    },
    [counts, userReactions]
  );

  const value = useMemo(
    () => ({
      counts,
      userReactions,
      isReady,
      reactToPost,
    }),
    [counts, isReady, reactToPost, userReactions]
  );

  return <ReactionsContext.Provider value={value}>{children}</ReactionsContext.Provider>;
}

export function useReactions() {
  const context = useContext(ReactionsContext);

  if (!context) {
    throw new Error("useReactions must be used inside ReactionsProvider.");
  }

  return context;
}
