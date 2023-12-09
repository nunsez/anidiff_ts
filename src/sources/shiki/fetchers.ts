import { parseManga } from "./manga.ts";
import { parseAnime } from "./anime.ts";

export const fetchAnimeList = async (url: URL) => {
  const result = await fetch(url);
  const json: unknown[] = await result.json();
  const animelist = json.map(parseAnime);

  return animelist;
};

export const fetchMangaList = async (url: URL) => {
  const result = await fetch(url);
  const json: unknown[] = await result.json();
  const mangaList = json.map(parseManga);

  return mangaList;
};
