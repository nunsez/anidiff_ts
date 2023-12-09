import { type AnimeEntity, type MangaEntity } from "../../entities.ts";
import { shikiAnimeUrl, shikiMangaUrl } from "../../settings.ts";
import { parseManga } from "./manga.ts";
import { parseAnime } from "./anime.ts";

export async function fetchAnimeList(): Promise<AnimeEntity[]> {
  const url = shikiAnimeUrl();
  const result = await fetch(url);
  const json: unknown[] = await result.json();
  const animelist = json.map(parseAnime);

  return animelist;
}

export async function fetchMangaList(): Promise<MangaEntity[]> {
  const url = shikiMangaUrl();
  const result = await fetch(url);
  const json: unknown[] = await result.json();
  const mangaList = json.map(parseManga);

  return mangaList;
}
