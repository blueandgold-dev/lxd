"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogPost } from "@/data/posts";

type RecentArticlesProps = {
  posts: BlogPost[];
};

function getInitialVisibilityClass(index: number) {
  if (index < 2) {
    return "";
  }

  if (index < 4) {
    return "hidden md:block";
  }

  if (index < 6) {
    return "hidden lg:block";
  }

  return "hidden";
}

export function RecentArticles({ posts }: RecentArticlesProps) {
  const [showAll, setShowAll] = useState(false);
  const [cardMinHeight, setCardMinHeight] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hasMorePosts = posts.length > 6;

  const measureTallestCard = useCallback(() => {
    cardRefs.current.forEach((node) => {
      if (node) {
        node.style.minHeight = "";
      }
    });

    const visibleCards = cardRefs.current.filter(
      (node): node is HTMLDivElement => node !== null && window.getComputedStyle(node).display !== "none"
    );
    const tallestCard = Math.max(0, ...visibleCards.map((node) => node.getBoundingClientRect().height));
    const nextMinHeight = tallestCard > 0 ? Math.ceil(tallestCard) : null;

    setCardMinHeight(nextMinHeight);

    if (nextMinHeight) {
      cardRefs.current.forEach((node) => {
        if (node) {
          node.style.minHeight = `${nextMinHeight}px`;
        }
      });
    }
  }, []);

  useEffect(() => {
    measureTallestCard();
    window.addEventListener("resize", measureTallestCard);

    return () => {
      window.removeEventListener("resize", measureTallestCard);
    };
  }, [measureTallestCard, showAll]);

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            className={`h-full ${showAll ? "" : getInitialVisibilityClass(index)}`}
            style={cardMinHeight ? { minHeight: cardMinHeight } : undefined}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      {hasMorePosts ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((currentShowAll) => !currentShowAll)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {showAll ? "Load less articles" : "Load more articles"}
            {showAll ? <ChevronUp className="h-4 w-4" aria-hidden="true" /> : <ChevronDown className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      ) : null}
    </>
  );
}
