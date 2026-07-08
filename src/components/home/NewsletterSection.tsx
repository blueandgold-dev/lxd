export function NewsletterSection() {
  return (
    <section className="bg-primary px-5 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_0.9fr] md:items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Get practical LXD ideas in your inbox.</h2>
          <p className="mt-3 text-base leading-7 text-white/80">
            A calm monthly note with course design prompts, article highlights, and teaching strategies.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter signup mockup">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            className="min-h-12 flex-1 rounded-full border border-white/20 bg-white px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent"
          />
          <button type="button" className="min-h-12 rounded-full bg-accent px-5 text-sm font-semibold text-foreground transition hover:bg-amber-400">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

