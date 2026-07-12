import Link from "next/link";
import type { BlogPost } from "@/data/posts";
import { PostReactions } from "@/components/blog/PostReactions";
import { Badge } from "@/components/shared/Badge";
import { CoverVisual } from "@/components/shared/CoverVisual";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <CoverVisual title={post.title} src={post.coverImage} alt={post.coverAlt} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Badge>{post.category}</Badge>
        <h3 className="mt-4 text-xl font-semibold leading-7 text-foreground">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
        <p className="mt-auto pt-5 text-sm font-medium text-muted">
          {post.date} · {post.readingTime}
        </p>
        <PostReactions slug={post.slug} className="mt-4" />
      </div>
    </article>
  );
}
