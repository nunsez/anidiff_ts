import { z } from "z";
import { type AnimeEntity, entityStatuses } from "../../entities.ts";

const statusEncodeMap = {
  [entityStatuses.watching]: 1,
  [entityStatuses.completed]: 2,
  [entityStatuses.onHold]: 3,
  [entityStatuses.dropped]: 4,
  [entityStatuses.planned]: 6,
} as const;

const statusDecodeMap = {
  1: entityStatuses.watching,
  2: entityStatuses.completed,
  3: entityStatuses.onHold,
  4: entityStatuses.dropped,
  6: entityStatuses.planned,
} as const;

const statusParser = z.nativeEnum(statusEncodeMap);

const animeParser = z.object({
  anime_id: z.number().int().positive(),
  anime_title: z.union([z.string(), z.number()]),
  score: z.number().int().gte(0).lte(10),
  status: statusParser,
  num_watched_episodes: z.number().int().nonnegative(),
});

export const parseAnime = (data: unknown): AnimeEntity => {
  let anime;

  try {
    anime = animeParser.parse(data);
  } catch {
    throw new Error("Unexpected MyAnimeList anime data format", { cause: data });
  }

  const status = statusDecodeMap[anime.status];

  return {
    id: anime.anime_id,
    title: anime.anime_title,
    score: anime.score,
    status,
    episodesWatched: anime.num_watched_episodes,
    source: "mal",
  };
};
