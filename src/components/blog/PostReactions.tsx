"use client";

import { Heart, ThumbsDown, ThumbsUp } from "lucide-react";
import { createEmptyCounts, type ReactionType } from "@/lib/reaction-types";
import { useReactions } from "@/components/blog/ReactionsProvider";

type PostReactionsProps = {
  slug: string;
  className?: string;
};

const reactionOptions: Array<{
  type: ReactionType;
  label: string;
  Icon: typeof Heart;
}> = [
  { type: "love", label: "Love", Icon: Heart },
  { type: "like", label: "Like", Icon: ThumbsUp },
  { type: "dislike", label: "Dislike", Icon: ThumbsDown },
];

export function PostReactions({ slug, className = "" }: PostReactionsProps) {
  const { counts, userReactions, isReady, reactToPost } = useReactions();
  const postCounts = counts[slug] ?? createEmptyCounts();
  const selectedReaction = userReactions[slug] ?? null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Post reactions">
      {reactionOptions.map(({ type, label, Icon }) => {
        const isSelected = selectedReaction === type;
        const nextReaction = isSelected ? null : type;

        return (
          <button
            key={type}
            type="button"
            onClick={() => void reactToPost(slug, nextReaction)}
            disabled={!isReady}
            aria-pressed={isSelected}
            aria-label={`${label} this post. Current count: ${postCounts[type]}`}
            title={label}
            className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 ${
              isSelected
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-border bg-background text-muted hover:border-primary hover:text-primary"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{postCounts[type]}</span>
          </button>
        );
      })}
    </div>
  );
}
