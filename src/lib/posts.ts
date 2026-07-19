import { posts, type BlogPost } from "@/data/posts";

export type TocItem = {
  id: string;
  title: string;
};

function sortByDateDesc(postsToSort: BlogPost[]): BlogPost[] {
  return [...postsToSort].sort((a, b) => {
    const dateDifference = Date.parse(b.date) - Date.parse(a.date);

    if (dateDifference !== 0) {
      return dateDifference;
    }

    return b.id.localeCompare(a.id);
  });
}

export function getAllPosts(): BlogPost[] {
  return sortByDateDesc(posts);
}

export function getFeaturedPosts(): BlogPost[] {
  return sortByDateDesc(posts.filter((post) => post.featured));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);

  if (!current) {
    return [];
  }

  return sortByDateDesc(posts)
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, limit);
}

export function getCategories(): string[] {
  return Array.from(new Set(getAllPosts().map((post) => post.category)));
}

export function getTableOfContents(post: BlogPost): TocItem[] {
  return post.blocks
    .filter((block) => block.type === "heading")
    .map((block) => ({
      id: block.id,
      title: block.title,
    }));
}
