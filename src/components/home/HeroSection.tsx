import Image from "next/image";
import { ButtonLink } from "@/components/shared/ButtonLink";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Learning Experience Design</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Design learning experiences that people actually remember.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            A modern blog about Learning Experience Design, learner-centered teaching, AI-assisted course creation, and practical strategies for meaningful learning.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/blog/what-is-learning-experience-design">Start with LXD</ButtonLink>
            <ButtonLink href="/blog" variant="secondary">Browse the blog</ButtonLink>
          </div>
        </div>
        <figure className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <Image
            className="aspect-[4/3] w-full object-cover"
            src="/images/hero-learning-studio.svg"
            alt="Illustration of a calm learning design desk with journey cards and feedback loops."
            width={960}
            height={720}
            priority
          />
          <figcaption className="sr-only">Learning Experience Design planning workspace</figcaption>
        </figure>
      </div>
    </section>
  );
}
