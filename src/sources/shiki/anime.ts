import { z } from "z";
import { type AnimeEntity, entityStatuses } from "../../entities.ts";

const statusEncodeMap = {
  [entityStatuses.watching]: "watching",
  [entityStatuses.completed]: "completed",
  [entityStatuses.onHold]: "on_hold",
  [entityStatuses.dropped]: "dropped",
  [entityStatuses.planned]: "planned",
} as const;

const statusDecodeMap = {
  watching: entityStatuses.watching,
  completed: entityStatuses.completed,
  on_hold: entityStatuses.onHold,
  dropped: entityStatuses.dropped,
  planned: entityStatuses.planned,
} as const;

const statusParser = z.nativeEnum(statusEncodeMap);

const animeParser = z.object({
  target_id: z.number().int().positive(),
  target_title: z.union([z.string(), z.number()]),
  score: z.number().int().gte(0).lte(10),
  status: statusParser,
  episodes: z.number().int().nonnegative(),
});

export const parseAnime = (data: unknown): AnimeEntity => {
  let anime;

  try {
    anime = animeParser.parse(data);
  } catch {
    throw new Error("Unexpected Shikimori anime data format", { cause: data });
  }

  const status = statusDecodeMap[anime.status];

  return {
    id: anime.target_id,
    title: anime.target_title,
    score: anime.score,
    status,
    episodesWatched: anime.episodes,
    source: "shiki",
  };
};
