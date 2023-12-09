import { z } from "../../deps.ts";
import { entityStatuses, type MangaEntity } from "../../entities.ts";

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

const mangaParser = z.object({
  id: z.number().int().positive(),
  manga_title: z.union([z.string(), z.number()]),
  score: z.number().int().gte(0).lte(10),
  status: statusParser,
  num_read_chapters: z.number().int().nonnegative(),
  num_read_volumes: z.number().int().nonnegative(),
});

export const parseManga = (data: unknown): MangaEntity => {
  const manga = mangaParser.parse(data);
  const status = statusDecodeMap[manga.status];

  return {
    id: manga.id,
    title: manga.manga_title,
    score: manga.score,
    status,
    chaptersRead: manga.num_read_chapters,
    volumesRead: manga.num_read_volumes,
    source: "mal",
  };
};
