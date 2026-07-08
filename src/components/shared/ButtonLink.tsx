import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = {
  variant?: "primary" | "secondary" | "ghost";
} & ComponentPropsWithoutRef<typeof Link>;

const variantClassName: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary: "bg-primary text-white shadow-sm hover:bg-primary-dark",
  secondary: "border border-border bg-surface text-primary hover:bg-secondary",
  ghost: "text-primary hover:bg-secondary",
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${variantClassName[variant]} ${className}`}
      {...props}
    />
  );
}

