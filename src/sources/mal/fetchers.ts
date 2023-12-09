import { DOMParser, pooledMap } from "../../deps.ts";
import { type AnimeEntity, type MangaEntity } from "../../entities.ts";
import { malAnimeUrl, malMangaUrl, malProfileUrl } from "../../settings.ts";
import { parseManga } from "./manga.ts";
import { parseAnime } from "./anime.ts";

export async function fetchAnimeList(): Promise<AnimeEntity[]> {
  const document = await profileDoc(malProfileUrl()) as unknown as Document;
  const animeTotal = getAnimeTotal(document);
  const offsets = buildOffsets(animeTotal);

  const allChunks = pooledMap(4, offsets, (offset) => {
    const url = malAnimeUrl(offset);
    return fetchChunk(url);
  });

  const animes: AnimeEntity[] = [];

  for await (const chunk of allChunks) {
    chunk.forEach((data) => {
      animes.push(parseAnime(data));
    });
  }

  return animes;
}

export async function fetchMangaList(): Promise<MangaEntity[]> {
  const document = await profileDoc(malProfileUrl()) as unknown as Document;
  const mangaTotal = getMangaTotal(document);
  const offsets = buildOffsets(mangaTotal);

  const allChunks = pooledMap(4, offsets, (offset) => {
    const url = malMangaUrl(offset);
    return fetchChunk(url);
  });

  const mangas: MangaEntity[] = [];

  for await (const chunk of allChunks) {
    chunk.forEach((data) => {
      mangas.push(parseManga(data));
    });
  }

  return mangas;
}

async function fetchChunk(url: URL): Promise<unknown[]> {
  const response = await fetch(url);
  return response.json();
}

function getMangaTotal(document: Document): number {
  const stats = document.querySelectorAll<HTMLLIElement>(".stats.manga ul.stats-data li");
  const totalSection = Array.from(stats).find(isTotalSection);

  if (!totalSection) {
    throw new Error("Total element not found", { cause: stats });
  }

  return getValue(totalSection);
}

function getAnimeTotal(document: Document): number {
  const stats = document.querySelectorAll<HTMLLIElement>(".stats.anime ul.stats-data li");
  const totalSection = Array.from(stats).find(isTotalSection);

  if (!totalSection) {
    throw new Error("Total element not found", { cause: stats });
  }

  return getValue(totalSection);
}

function isTotalSection(element: HTMLElement): boolean {
  const span = element.querySelector<HTMLSpanElement>("span:first-of-type");
  if (!span) return false;

  return span.textContent === "Total Entries";
}

function getValue(element: HTMLElement): number {
  const total = element.querySelector<HTMLSpanElement>("span:last-of-type");

  if (!total) {
    throw new Error("Total manga value not found", { cause: total });
  }

  const valueStr = total.textContent ?? "";
  const value = Number.parseInt(valueStr.replaceAll(/\D/g, ""));

  return value;
}

async function profileDoc(profileUrl: URL) {
  const response = await fetch(profileUrl);
  const html = await response.text();
  const document = new DOMParser().parseFromString(html, "text/html");

  if (!document) {
    throw new Error("Profile not found");
  }

  return document;
}

const CHUNK_SIZE = 300;

function buildOffsets(total: number, chunkSize: number = CHUNK_SIZE): number[] {
  const iterations = Math.ceil(total / chunkSize);
  const res = Array.from({ length: iterations }, (_, idx) => idx * chunkSize);

  return res;
}
