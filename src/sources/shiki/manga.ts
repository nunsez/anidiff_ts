import { z } from "z";
import { entityStatuses, type MangaEntity } from "../../entities.ts";

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

const mangaParser = z.object({
  target_id: z.number().int().positive(),
  target_title: z.union([z.string(), z.number()]),
  score: z.number().int().gte(0).lte(10),
  status: statusParser,
  chapters: z.number().int().nonnegative(),
  volumes: z.number().int().nonnegative(),
});

export const parseManga = (data: unknown): MangaEntity => {
  let manga;

  try {
    manga = mangaParser.parse(data);
  } catch {
    throw new Error("Unexpected Shikimori manga data format", { cause: data });
  }

  const status = statusDecodeMap[manga.status];

  return {
    id: manga.target_id,
    title: manga.target_title,
    score: manga.score,
    status,
    chaptersRead: manga.chapters,
    volumesRead: manga.volumes,
    source: "shiki",
  };
};
