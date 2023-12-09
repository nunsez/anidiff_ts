import { initSettings } from "./settings.ts";
import * as mal from "./sources/mal/index.ts";
import * as shiki from "./sources/shiki/index.ts";
import {
  type AnimeEntity,
  type EqualsFunc,
  isAnimeEquals,
  isMangaEquals,
  type MangaEntity,
} from "./entities.ts";

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
  const list1Map = list1.reduce<Record<string, T>>((acc, item) => {
    acc[item.id.toString()] = item;
    return acc;
  }, {});

  const list2Map = list2.reduce<Record<string, T>>((acc, item) => {
    acc[item.id.toString()] = item;
    return acc;
  }, {});

  const list1Diff = findDiff(list1Map, list2Map, equalsFn);
  const list2Diff = findDiff(list2Map, list1Map, equalsFn);
  const uniq = findDiff(list1Diff, list2Diff, (_, s) => !s);

  return uniq;
}

function findDiff<T>(
  items: Record<string, T>,
  others: Record<string, T>,
  isEquals: EqualsFunc<T>,
): Record<string, T> {
  const result: Record<string, T> = {};

  for (const [key, item] of Object.entries(items)) {
    const other = others[key];
    const equalsResult = isEquals(item, other);

    if (!equalsResult) {
      result[key] = item;
    }
  }

  return result;
}

function report(entity: MangaEntity | AnimeEntity) {
  console.log(`${entity.id}: ${entity.title}`);
}

function isEmptyDiff(diff: Record<number, unknown>) {
  return Object.keys(diff).length === 0;
}

if (import.meta.main) {
  await main();
}
