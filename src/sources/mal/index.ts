import { fetchAnimeList, fetchMangaList, fetchProfileDocument } from "./fetchers.ts";
import { animeUrl, mangaUrl, profileUrl } from "./utils.ts";

const isTotalSection = (element: HTMLElement) => {
  const span = element.querySelector<HTMLSpanElement>("span:first-of-type");
  if (!span) return false;

  return span.textContent === "Total Entries";
};

const getValue = (element: HTMLElement) => {
  const total = element.querySelector<HTMLSpanElement>("span:last-of-type");

  if (!total) {
    throw new Error("Total manga value not found", { cause: total });
  }

  const valueStr = total.textContent ?? "";
  const value = Number.parseInt(valueStr.replaceAll(/\D/g, ""));

  return value;
};

const getMangaTotal = (document: Document) => {
  const stats = document.querySelectorAll<HTMLLIElement>(".stats.manga ul.stats-data li");
  const totalSection = Array.from(stats).find(isTotalSection);

  if (!totalSection) {
    throw new Error("Total element not found", { cause: stats });
  }

  return getValue(totalSection);
};

const getAnimeTotal = (document: Document) => {
  const stats = document.querySelectorAll<HTMLLIElement>(".stats.anime ul.stats-data li");
  const totalSection = Array.from(stats).find(isTotalSection);

  if (!totalSection) {
    throw new Error("Total element not found", { cause: stats });
  }

  return getValue(totalSection);
};

export const animeList = async (profileName: string) => {
  const malProfileDoc = await fetchProfileDocument(profileUrl(profileName));
  const animeTotal = getAnimeTotal(malProfileDoc);

  const animes = await fetchAnimeList({ animeTotal, animeUrl: animeUrl(profileName) });

  return animes;
};

export const mangaList = async (profileName: string) => {
  const malProfileDoc = await fetchProfileDocument(profileUrl(profileName));
  const mangaTotal = getMangaTotal(malProfileDoc);

  const mangas = await fetchMangaList({ mangaTotal, mangaUrl: mangaUrl(profileName) });

  return mangas;
};
