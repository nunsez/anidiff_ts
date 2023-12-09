export const entityStatuses = {
  watching: "watching",
  completed: "completed",
  onHold: "onHold",
  dropped: "dropped",
  planned: "planned",
} as const;

export type EntityStatuses = typeof entityStatuses[keyof typeof entityStatuses];

export type AnimeEntity = {
  id: number;
  title: string | number;
  status: EntityStatuses;
  score: number;
  episodesWatched: number;
  source: string;
};

export type MangaEntity = {
  id: number;
  title: string | number;
  status: EntityStatuses;
  score: number;
  chaptersRead: number;
  volumesRead: number;
  source: string;
};

export type EqualsFunc<T> = (e1: T | undefined, e2: T | undefined) => boolean;

export const isAnimeEquals = (a1: AnimeEntity | undefined, a2: AnimeEntity | undefined) => {
  if (!a1 || !a2) return false;

  return a1.status === a2.status &&
    a1.score === a2.score &&
    a1.episodesWatched === a2.episodesWatched;
};

export const isMangaEquals = (a1: MangaEntity | undefined, a2: MangaEntity | undefined) => {
  if (!a1 || !a2) return false;

  return a1.status === a2.status &&
    a1.score === a2.score &&
    a1.chaptersRead === a2.chaptersRead &&
    a1.volumesRead === a2.volumesRead;
};
