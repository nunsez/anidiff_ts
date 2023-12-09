import { initSettings } from "./settings.ts";
import * as mal from "./sources/mal/index.ts";
import * as shiki from "./sources/shiki/index.ts";
import { type AnimeEntity, type EqualsFunc, isAnimeEquals, isMangaEquals, type MangaEntity } from "./entities.ts";

async function main() {
  initSettings();

  const malAnimeList = await mal.fetchAnimeList();
  const shikiAnimeList = await shiki.fetchAnimeList();
  const animeDiff = getDiff(malAnimeList, shikiAnimeList, isAnimeEquals);

  if (!isEmptyDiff(animeDiff)) {
    console.log("Anime diff:");
    Object.values(animeDiff).forEach(report);
  }

  const malMangaList = await mal.fetchMangaList();
  const shikiMangaList = await shiki.fetchMangaList();
  const mangaDiff = getDiff(malMangaList, shikiMangaList, isMangaEquals);

  if (!isEmptyDiff(mangaDiff)) {
    if (!isEmptyDiff(animeDiff)) {
      console.log();
    }

    console.log("Manga diff:");
    Object.values(mangaDiff).forEach(report);
  }

  if (isEmptyDiff(animeDiff) && isEmptyDiff(mangaDiff)) {
    console.log("No difference.");
  }

  prompt("Press Enter key to exit.");
}

function getDiff<T extends { id: number }>(
  list1: T[],
  list2: T[],
  equalsFn: EqualsFunc<T>,
) {
  const list1Map: Record<number, T> = {};
  list1.forEach((item) => {
    list1Map[item.id] = item;
  });

  const list2Map: Record<number, T> = {};
  list2.forEach((item) => {
    list2Map[item.id] = item;
  });

  const list1Diff = findDiff(list1Map, list2Map, equalsFn);
  const list2Diff = findDiff(list2Map, list1Map, equalsFn);
  const uniq = findDiff(list1Diff, list2Diff, (_, s) => !s);

  return uniq;
}

function findDiff<T>(
  items: Record<number, T>,
  others: Record<number, T>,
  isEqual: EqualsFunc<T>,
): Record<number, T> {
  const result: Record<number, T> = {};

  Object.keys(items).forEach((key) => {
    const id = Number.parseInt(key);
    const item = items[id]!;
    const other = others[id];
    const equalsResult = isEqual(item, other);

    if (!equalsResult) {
      result[id] = item;
    }
  });

  return result;
}

if (import.meta.main) {
  await main();
}

function report(entity: MangaEntity | AnimeEntity) {
  console.log(`${entity.id}: ${entity.title}`);
}

function isEmptyDiff(diff: Record<number, unknown>) {
  return Object.keys(diff).length === 0;
}
