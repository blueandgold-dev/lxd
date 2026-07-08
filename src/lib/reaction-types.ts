export const reactionTypes = ["love", "like", "dislike"] as const;

export type ReactionType = (typeof reactionTypes)[number];

export type ReactionCounts = Record<ReactionType, number>;

export type ReactionMap = Record<string, ReactionCounts>;

export function createEmptyCounts(): ReactionCounts {
  return {
    love: 0,
    like: 0,
    dislike: 0,
  };
}

export function isReactionType(value: unknown): value is ReactionType {
  return typeof value === "string" && reactionTypes.includes(value as ReactionType);
}
