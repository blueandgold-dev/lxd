import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-[0.65rem] font-bold tracking-wide text-white">
              LXD
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface" aria-hidden="true" />
            </span>
            <p className="font-semibold text-foreground">Learning Experience Design</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">
            A practical publication for educators, trainers, and learning designers who want to create clearer, more meaningful learning experiences.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Explore</p>
          <div className="mt-3 grid gap-2 text-sm text-muted">
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <Link href="/topics" className="hover:text-primary">Topics</Link>
            <Link href="/resources" className="hover:text-primary">Resources</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Start here</p>
          <div className="mt-3 grid gap-2 text-sm text-muted">
            <Link href="/blog/what-is-learning-experience-design" className="hover:text-primary">What is LXD?</Link>
            <Link href="/blog/leveraging-ai-in-learning-experience-design" className="hover:text-primary">AI in LXD</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
