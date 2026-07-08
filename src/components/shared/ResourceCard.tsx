import Link from "next/link";

type ResourceCardProps = {
  title: string;
  description: string;
  href?: string;
};

function ResourceCardContent({ title, description }: Pick<ResourceCardProps, "title" | "description">) {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </>
  );
}

export function ResourceCard({ title, description, href }: ResourceCardProps) {
  const cardClassName =
    "rounded-lg border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

  if (href) {
    return (
      <Link
        href={href}
        className={`${cardClassName} block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`}
      >
        <ResourceCardContent title={title} description={description} />
      </Link>
    );
  }

  return (
    <article className="rounded-lg border border-border bg-surface p-6 shadow-sm">
      <ResourceCardContent title={title} description={description} />
    </article>
  );
}
