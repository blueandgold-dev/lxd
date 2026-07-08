import { NextResponse } from "next/server";
import { isReactionType, type ReactionType } from "@/lib/reaction-types";
import { getReactionCounts, updateReactionCounts } from "@/lib/reactions";

export const dynamic = "force-dynamic";

type ReactionRequest = {
  slug?: unknown;
  previousReaction?: unknown;
  nextReaction?: unknown;
};

function toOptionalReaction(value: unknown): ReactionType | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (isReactionType(value)) {
    return value;
  }

  throw new Error("Invalid reaction type.");
}

export async function GET() {
  const { counts, configured } = await getReactionCounts();

  return NextResponse.json(
    { counts, configured },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(request: Request) {
  let body: ReactionRequest;

  try {
    body = (await request.json()) as ReactionRequest;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
  }

  if (typeof body.slug !== "string" || body.slug.trim().length === 0) {
    return NextResponse.json({ message: "A blog post slug is required." }, { status: 400 });
  }

  try {
    const counts = await updateReactionCounts({
      slug: body.slug,
      previousReaction: toOptionalReaction(body.previousReaction),
      nextReaction: toOptionalReaction(body.nextReaction),
    });

    return NextResponse.json({ slug: body.slug, counts });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update reaction counts.";
    const status = message.includes("not configured") ? 503 : message.includes("Unknown") ? 404 : 400;

    return NextResponse.json({ message }, { status });
  }
}
