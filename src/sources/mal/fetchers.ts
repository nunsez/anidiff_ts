import { pooledMap } from "std/async/pool.ts";
import { DOMParser } from "deno-dom-wasm";
import { parseManga } from "./manga.ts";
import { parseAnime } from "./anime.ts";

const CHUNK_SIZE = 300;
const POOL_LIMIT = 4;

const buildOffsets = (total: number, chunkSize: number = CHUNK_SIZE) => {
  const length = Math.ceil(total / chunkSize);
  const offsets = Array.from({ length }, (_, idx) => idx * chunkSize);

  return offsets;
};

const fetchChunk = async (url: URL): Promise<unknown[]> => {
  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error(`Load error: ${url}`);
  }

  return response.json();
};

export const fetchProfileDocument = async (profileUrl: URL) => {
  const response = await fetch(profileUrl);
  const html = await response.text();

  if (response.status !== 200) {
    throw new Error("MyAnimeList profile not found");
  }

  const document = new DOMParser().parseFromString(html, "text/html");

  if (!document) {
    throw new Error("MyAnimeList profile parse Error");
  }

  return document as unknown as Document;
};

export interface FetchAnimeArgs {
  animeTotal: number;
  animeUrl: (offset: number) => URL;
  poolLimit?: number;
}

export const fetchAnimeList = async (args: FetchAnimeArgs) => {
  const poolLimit = args.poolLimit ?? POOL_LIMIT;
  const offsets = buildOffsets(args.animeTotal);

  const allChunks = pooledMap(poolLimit, offsets, (offset) => {
    const url = args.animeUrl(offset);
    return fetchChunk(url);
  });

  const animes: ReturnType<typeof parseAnime>[] = [];

  for await (const chunk of allChunks) {
    chunk.forEach((data) => {
      animes.push(parseAnime(data));
    });
  }

  return animes;
};

export interface FetchMangaArgs {
  mangaTotal: number;
  mangaUrl: (offset: number) => URL;
  poolLimit?: number;
}

export const fetchMangaList = async (args: FetchMangaArgs) => {
  const poolLimit = args.poolLimit ?? POOL_LIMIT;
  const offsets = buildOffsets(args.mangaTotal);

  const allChunks = pooledMap(poolLimit, offsets, (offset) => {
    const url = args.mangaUrl(offset);
    return fetchChunk(url);
  });

  const mangas: ReturnType<typeof parseManga>[] = [];

  for await (const chunk of allChunks) {
    chunk.forEach((data) => {
      mangas.push(parseManga(data));
    });
  }

  return mangas;
};
