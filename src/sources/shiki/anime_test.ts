import { assertEquals, assertThrows } from "std/assert/mod.ts";
import { parseAnime } from "./anime.ts";
import { type AnimeEntity } from "../../entities.ts";

Deno.test("Shikimori parseAnime title is string", () => {
  const data: unknown = {
    "target_title": "Houseki no Kuni",
    "target_id": 35557,
    "target_type": "Anime",
    "score": 10,
    "status": "completed",
    "rewatches": 0,
    "episodes": 12,
    "text": null,
  };

  const expected: AnimeEntity = {
    id: 35557,
    title: "Houseki no Kuni",
    status: "completed",
    score: 10,
    episodesWatched: 12,
    source: "shiki",
  };

  const actual = parseAnime(data);

  assertEquals(actual, expected);
});

Deno.test("Shikimori parseAnime title is number", () => {
  const data: unknown = {
    "target_title": "86",
    "target_id": 41457,
    "target_type": "Anime",
    "score": 8,
    "status": "completed",
    "rewatches": 0,
    "episodes": 11,
    "text": "",
  };

  const expected: AnimeEntity = {
    id: 41457,
    title: "86",
    status: "completed",
    score: 8,
    episodesWatched: 11,
    source: "shiki",
  };

  const actual = parseAnime(data);

  assertEquals(actual, expected);
});

Deno.test("Shikimori parseAnime throws on invalid data", () => {
  const data: unknown = {
    "target_title": "Houseki no Kuni",
    "target_id": "invalid id",
    "target_type": "Anime",
    "score": 10,
    "status": "completed",
    "rewatches": 0,
    "episodes": 12,
    "text": null,
  };

  assertThrows(() => {
    parseAnime(data);
  });
});
