import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/topics", label: "Topics" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3 font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-[0.7rem] font-bold tracking-wide text-white shadow-sm">
            LXD
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent ring-2 ring-background" aria-hidden="true" />
          </span>
          <span>Learning Experience Design</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-secondary hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:inline-flex"
        >
          Read articles
        </Link>
      </nav>
      <div className="flex gap-1 overflow-x-auto border-t border-border px-5 py-2 md:hidden">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-secondary hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
