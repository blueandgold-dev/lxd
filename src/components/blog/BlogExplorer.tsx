"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import type { BlogPost } from "@/data/posts";
import { BlogCard } from "@/components/blog/BlogCard";

type BlogExplorerProps = {
  posts: BlogPost[];
  categories: string[];
};

export function BlogExplorer({ posts, categories }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [post.title, post.excerpt, post.category, ...post.tags].some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, posts, query]);

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value);
  }

  return (
    <section className="px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
          <label className="sr-only" htmlFor="blog-search">Search articles</label>
          <input
            id="blog-search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search by title, topic, or tag"
            className="min-h-12 rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="flex gap-2 overflow-x-auto">
            {["All", ...categories].map((category) => {
              const isActive = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive ? "border-primary bg-primary text-white" : "border-border bg-background text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
        {filteredPosts.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center text-muted">
            No articles match your search yet.
          </div>
        )}
      </div>
    </section>
  );
}

