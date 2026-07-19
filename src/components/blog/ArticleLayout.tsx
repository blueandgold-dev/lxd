import type { BlogPost } from "@/data/posts";
import type { TocItem } from "@/lib/posts";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { NewPostBadge } from "@/components/blog/NewPostBadge";
import { PostReactions } from "@/components/blog/PostReactions";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Badge } from "@/components/shared/Badge";
import { CoverVisual } from "@/components/shared/CoverVisual";

type ArticleLayoutProps = {
  post: BlogPost;
  toc: TocItem[];
  relatedPosts: BlogPost[];
};

export function ArticleLayout({ post, toc, relatedPosts }: ArticleLayoutProps) {
  return (
    <main>
      <section className="border-b border-border bg-background px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{post.category}</Badge>
            <NewPostBadge newUntil={post.newUntil} />
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium text-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <PostReactions slug={post.slug} className="mt-6" />
        </div>
      </section>
      <section className="px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <CoverVisual title={post.title} src={post.coverImage} alt={post.coverAlt} />
        </div>
      </section>
      <section className="px-5 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_260px]">
          <article className="min-w-0 rounded-lg border border-border bg-surface px-5 py-8 shadow-sm sm:px-8 lg:px-10">
            <ArticleBody blocks={post.blocks} />
            <div className="mt-10 border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground">Share this article</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {["LinkedIn", "X", "Email"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </article>
          <TableOfContents items={toc} />
        </div>
      </section>
      {relatedPosts.length > 0 ? (
        <section className="border-t border-border bg-secondary px-5 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Related posts</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
