import "server-only";

import { get, put } from "@vercel/blob";
import { getAllPosts } from "@/lib/posts";
import { type ReactionCounts, type ReactionMap, type ReactionType } from "@/lib/reaction-types";

type ReactionStore = {
  posts: ReactionMap;
  updatedAt?: string;
};

const BLOB_PATH = "lxd-blob/reactions.json";

function normalizeCounts(counts: Partial<ReactionCounts> | undefined): ReactionCounts {
  return {
    love: Math.max(0, Number(counts?.love ?? 0)),
    like: Math.max(0, Number(counts?.like ?? 0)),
    dislike: Math.max(0, Number(counts?.dislike ?? 0)),
  };
}

function normalizeStore(value: unknown): ReactionStore {
  const source = typeof value === "object" && value !== null ? (value as Partial<ReactionStore>) : {};
  const posts = typeof source.posts === "object" && source.posts !== null ? source.posts : {};

  return {
    posts: Object.fromEntries(
      Object.entries(posts).map(([slug, counts]) => [slug, normalizeCounts(counts as Partial<ReactionCounts>)])
    ),
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : undefined,
  };
}

function withKnownPosts(store: ReactionStore): ReactionStore {
  return {
    ...store,
    posts: Object.fromEntries(getAllPosts().map((post) => [post.slug, normalizeCounts(store.posts[post.slug])])),
  };
}

function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function getReactionCounts(): Promise<{ counts: ReactionMap; configured: boolean }> {
  if (!isBlobConfigured()) {
    return {
      counts: withKnownPosts({ posts: {} }).posts,
      configured: false,
    };
  }

  try {
    const blob = await get(BLOB_PATH, { access: "private", useCache: false });

    if (!blob || blob.statusCode !== 200) {
      return {
        counts: withKnownPosts({ posts: {} }).posts,
        configured: true,
      };
    }

    const body = await new Response(blob.stream).text();

    return {
      counts: withKnownPosts(normalizeStore(JSON.parse(body))).posts,
      configured: true,
    };
  } catch (error) {
    console.error("Unable to read reaction counts from Vercel Blob.", error);

    return {
      counts: withKnownPosts({ posts: {} }).posts,
      configured: false,
    };
  }
}

export async function updateReactionCounts({
  slug,
  previousReaction,
  nextReaction,
}: {
  slug: string;
  previousReaction: ReactionType | null;
  nextReaction: ReactionType | null;
}): Promise<ReactionCounts> {
  if (!isBlobConfigured()) {
    throw new Error("Vercel Blob is not configured. Set BLOB_READ_WRITE_TOKEN for the lxd-blob store.");
  }

  if (!getAllPosts().some((post) => post.slug === slug)) {
    throw new Error("Unknown blog post slug.");
  }

  const { counts } = await getReactionCounts();
  const postCounts = normalizeCounts(counts[slug]);

  if (previousReaction) {
    postCounts[previousReaction] = Math.max(0, postCounts[previousReaction] - 1);
  }

  if (nextReaction) {
    postCounts[nextReaction] += 1;
  }

  await put(
    BLOB_PATH,
    JSON.stringify(
      {
        posts: {
          ...counts,
          [slug]: postCounts,
        },
        updatedAt: new Date().toISOString(),
      } satisfies ReactionStore,
      null,
      2
    ),
    {
      access: "private",
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      contentType: "application/json",
    }
  );

  return postCounts;
}

export function isReactionType(value: unknown): value is ReactionType {
  return typeof value === "string" && ["love", "like", "dislike"].includes(value);
}
