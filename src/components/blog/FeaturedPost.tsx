import type { BlogPost } from "@/data/posts";
import { Badge } from "@/components/shared/Badge";
import { ButtonLink } from "@/components/shared/ButtonLink";
import { CoverVisual } from "@/components/shared/CoverVisual";

type FeaturedPostProps = {
  post: BlogPost;
};

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="grid gap-6 rounded-lg border border-border bg-surface p-5 shadow-sm md:grid-cols-[0.95fr_1.05fr] md:p-6">
      <CoverVisual title={post.title} src={post.coverImage} alt={post.coverAlt} />
      <div className="flex flex-col justify-center">
        <Badge>{post.category}</Badge>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{post.title}</h2>
        <p className="mt-4 text-base leading-7 text-muted">{post.excerpt}</p>
        <p className="mt-5 text-sm font-medium text-muted">
          {post.author} · {post.date} · {post.readingTime}
        </p>
        <div className="mt-6">
          <ButtonLink href={`/blog/${post.slug}`}>Read featured article</ButtonLink>
        </div>
      </div>
    </article>
  );
}
