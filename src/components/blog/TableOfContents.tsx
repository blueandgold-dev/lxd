import type { TocItem } from "@/lib/posts";

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-28 rounded-lg border border-border bg-surface p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">Table of contents</h2>
        <nav className="mt-4 grid gap-2" aria-label="Article table of contents">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-sm leading-5 text-muted transition hover:text-primary">
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

