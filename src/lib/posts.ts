import { posts, type BlogPost } from "@/data/posts";

export type TocItem = {
  id: string;
  title: string;
};

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getFeaturedPosts(): BlogPost[] {
  return posts.filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);

  if (!current) {
    return [];
  }

  return posts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((post) => post.category)));
}

export function getTableOfContents(post: BlogPost): TocItem[] {
  return post.blocks
    .filter((block) => block.type === "heading")
    .map((block) => ({
      id: block.id,
      title: block.title,
    }));
}

