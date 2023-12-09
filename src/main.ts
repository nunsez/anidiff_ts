import * as mal from "./sources/mal/index.ts";
import * as shiki from "./sources/shiki/index.ts";
import { getDiff, isDiffEmpty } from "./comparator.ts";
import { isAnimeEquals, isMangaEquals } from "./entities.ts";

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

  console.log(message);

  const promptName = prompt("");

  if (!promptName) {
    throw new Error("No name provided. Exit");
  }

  return promptName;
};

const report = (entity: { id: unknown; title: unknown }) => {
  console.log(`${entity.id}: ${entity.title}`);
};

const main = async () => {
  const malProfileName = readName("MAL_NAME", "Enter Shikimori Profile name:");
  const shikiProfileName = readName("SHIKI_NAME", "Enter Myanimelist Profile name:");

  const animeDiff = await getAnimeDiff(malProfileName, shikiProfileName);
  const anyAnimeDiff = !isDiffEmpty(animeDiff);

  const mangaDiff = await getMangaDiff(malProfileName, shikiProfileName);
  const anyMangaDiff = !isDiffEmpty(mangaDiff);

  if (!anyAnimeDiff && !anyMangaDiff) {
    console.log("No difference.");
    Deno.exit(0);
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

  Deno.exit(0);
};

if (import.meta.main) {
  await main();

  prompt("Press Enter key to exit.");
}
