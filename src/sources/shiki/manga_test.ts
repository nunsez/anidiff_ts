import { assertEquals, assertThrows } from "std/assert/mod.ts";
import { parseManga } from "./manga.ts";
import { type MangaEntity } from "../../entities.ts";

Deno.test("Shikimori parseManga title is string", () => {
  const data: unknown = {
    "target_title": "Houseki no Kuni",
    "target_id": 44489,
    "target_type": "Manga",
    "score": 10,
    "status": "watching",
    "rewatches": 0,
    "volumes": 0,
    "chapters": 66,
    "text": null,
  };

  const expected: MangaEntity = {
    id: 44489,
    title: "Houseki no Kuni",
    status: "watching",
    score: 10,
    chaptersRead: 66,
    volumesRead: 0,
    source: "shiki",
  };

  const actual = parseManga(data);

  assertEquals(actual, expected);
});

Deno.test("Shikimori parseManga title is number", () => {
  const data: unknown = {
    "target_title": "86",
    "target_id": 104039,
    "target_type": "Manga",
    "score": 0,
    "status": "planned",
    "rewatches": 0,
    "volumes": 0,
    "chapters": 0,
    "text": null,
  };

  const expected: MangaEntity = {
    id: 104039,
    title: "86",
    status: "planned",
    score: 0,
    chaptersRead: 0,
    volumesRead: 0,
    source: "shiki",
  };

  const actual = parseManga(data);

  assertEquals(actual, expected);
});

Deno.test("Shikimori parseAnime throws on invalid data", () => {
  const data: unknown = {
    "target_title": "Houseki no Kuni",
    "target_id": "invalid id",
    "target_type": "Manga",
    "score": 10,
    "status": "watching",
    "rewatches": 0,
    "volumes": 0,
    "chapters": 66,
    "text": null,
  };

  assertThrows(() => {
    parseManga(data);
  });
});
