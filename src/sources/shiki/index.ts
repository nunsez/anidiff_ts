import { fetchAnimeList, fetchMangaList } from "./fetchers.ts";
import { animeUrl, mangaUrl } from "./settings.ts";

export const animeList = async (profileName: string) => {
  const animes = await fetchAnimeList(animeUrl(profileName));

  return animes;
};

export const mangaList = async (profileName: string) => {
  const mangas = await fetchMangaList(mangaUrl(profileName));

  return mangas;
};
