"use client";

import { useEffect, useState } from "react";

type NewPostBadgeProps = {
  newUntil?: string;
  placement?: "inline" | "overlay";
};

function isBeforeNewUntil(newUntil?: string) {
  if (!newUntil) {
    return false;
  }

  const expiresAt = Date.parse(`${newUntil}T00:00:00`);

  if (Number.isNaN(expiresAt)) {
    return false;
  }

  return Date.now() < expiresAt;
}

export function NewPostBadge({ newUntil, placement = "inline" }: NewPostBadgeProps) {
  const [isNew, setIsNew] = useState(() => isBeforeNewUntil(newUntil));

  useEffect(() => {
    const updateBadge = () => {
      setIsNew(isBeforeNewUntil(newUntil));
    };
    const expiresAt = newUntil ? Date.parse(`${newUntil}T00:00:00`) : Number.NaN;
    const expiryTimer =
      Number.isNaN(expiresAt) || Date.now() >= expiresAt
        ? undefined
        : window.setTimeout(updateBadge, expiresAt - Date.now());

    return () => {
      if (expiryTimer) {
        window.clearTimeout(expiryTimer);
      }
    };
  }, [newUntil]);

  if (!isNew) {
    return null;
  }

  const className =
    placement === "overlay"
      ? "absolute right-4 top-4 z-10 inline-flex w-fit items-center rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 shadow-sm"
      : "inline-flex w-fit items-center rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800";

  return (
    <span
      className={className}
      aria-label="New post"
    >
      New
    </span>
  );
}
