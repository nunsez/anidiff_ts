import * as mal from "./src/sources/mal/index.ts";
import * as shiki from "./src/sources/shiki/index.ts";
import { getDiff, isDiffEmpty } from "./src/comparator.ts";
import { isAnimeEquals, isMangaEquals } from "./src/entities.ts";

export const getMangaDiff = async (malProfileName: string, shikiProfileName: string) => {
  const malMangaList = await mal.mangaList(malProfileName);
  const shikiMangaList = await shiki.mangaList(shikiProfileName);
  const mangaDiff = getDiff(malMangaList, shikiMangaList, isMangaEquals);

  return mangaDiff;
};

export const getAnimeDiff = async (malProfileName: string, shikiProfileName: string) => {
  const malAnimeList = await mal.animeList(malProfileName);
  const shikiAnimeList = await shiki.animeList(shikiProfileName);
  const animeDiff = getDiff(malAnimeList, shikiAnimeList, isAnimeEquals);

  return animeDiff;
};

const readName = (envKey: string, message: string) => {
  const envValue = (Deno.env.get(envKey) ?? "").trim();

  if (envValue !== "") {
    return envValue;
  }

  const promptName = prompt(message);

  if (!promptName) {
    throw new Error("No name provided. Exit");
  }

  return promptName;
};

const report = (entity: { id: unknown; title: unknown }) => {
  console.log(`${entity.id}: ${entity.title}`);
};

const main = async () => {
  const malProfileName = readName("MAL_NAME", "Enter MyAnimeList profile name:");
  const shikiProfileName = readName("SHIKI_NAME", "Enter Shikimori profile name:");

  const animeDiff = await getAnimeDiff(malProfileName, shikiProfileName);
  const anyAnimeDiff = !isDiffEmpty(animeDiff);

  const mangaDiff = await getMangaDiff(malProfileName, shikiProfileName);
  const anyMangaDiff = !isDiffEmpty(mangaDiff);

  if (!anyAnimeDiff && !anyMangaDiff) {
    console.log("No difference");
    return;
  }

  if (anyAnimeDiff) {
    console.log("Anime diff:");
    Object.values(animeDiff).forEach(report);
  }

  if (anyMangaDiff) {
    if (anyAnimeDiff) console.log();

    console.log("Manga diff:");
    Object.values(mangaDiff).forEach(report);
  }
};

if (import.meta.main) {
  try {
    await main();
  } catch (e) {
    console.log(e.message);
  }

  alert("\nPress the Enter key to exit the program");
}
