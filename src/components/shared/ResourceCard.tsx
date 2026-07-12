import Link from "next/link";
import { Download } from "lucide-react";

type ResourceCardProps = {
  title: string;
  description: string;
  href?: string;
  actionLabel?: string;
};

function ResourceCardContent({ title, description, actionLabel }: Pick<ResourceCardProps, "title" | "description" | "actionLabel">) {
  return (
    <>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      {actionLabel ? (
        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
          <Download aria-hidden="true" className="h-3.5 w-3.5" />
          {actionLabel}
        </span>
      ) : null}
    </>
  );
}

export function ResourceCard({ title, description, href, actionLabel }: ResourceCardProps) {
  const cardClassName =
    "rounded-lg border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md";

  if (href) {
    return (
      <Link
        href={href}
        className={`${cardClassName} block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary`}
      >
        <ResourceCardContent title={title} description={description} actionLabel={actionLabel} />
      </Link>
    );
  }

  return (
    <article className="rounded-lg border border-border bg-surface p-6 shadow-sm">
      <ResourceCardContent title={title} description={description} actionLabel={actionLabel} />
    </article>
  );
}
