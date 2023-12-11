import { assertEquals, assertThrows } from "std/assert/mod.ts";
import { parseManga } from "./manga.ts";
import { type MangaEntity } from "../../entities.ts";

Deno.test("MyAnimeList parseManga title is string", () => {
  const data: unknown = {
    "id": 64738831,
    "status": 1,
    "score": 10,
    "tags": "",
    "is_rereading": 0,
    "num_read_chapters": 66,
    "num_read_volumes": 0,
    "created_at": 1514826517,
    "manga_title": "Houseki no Kuni",
    "manga_english": "Land of the Lustrous",
    "manga_num_chapters": 0,
    "manga_num_volumes": 0,
    "manga_publishing_status": 1,
    "manga_id": 44489,
    "manga_magazines": null,
    "manga_total_members": 123962,
    "manga_total_scores": 38717,
    "manga_score_val": 8.96,
    "manga_score_diff": 1.04,
    "manga_popularity": 94,
    "genres": [{ "id": 1, "name": "Action" }, { "id": 8, "name": "Drama" }, {
      "id": 10,
      "name": "Fantasy",
    }],
    "demographics": [{ "id": 41, "name": "Seinen" }],
    "title_localized": null,
    "manga_url": "\/manga\/44489\/Houseki_no_Kuni",
    "manga_image_path":
      "https:\/\/cdn.myanimelist.net\/r\/192x272\/images\/manga\/1\/115443.webp?s=4c56d9e5c24846805e6a3d6e2848c2ea",
    "is_added_to_list": true,
    "manga_media_type_string": "Manga",
    "start_date_string": null,
    "finish_date_string": null,
    "manga_start_date_string": "25-10-12",
    "manga_end_date_string": null,
    "days_string": null,
    "retail_string": null,
    "priority_string": "Low",
    "notes": "",
    "editable_notes": "",
  };

  const expected: MangaEntity = {
    id: 44489,
    title: "Houseki no Kuni",
    status: "watching",
    score: 10,
    chaptersRead: 66,
    volumesRead: 0,
    source: "mal",
  };

  const actual = parseManga(data);

  assertEquals(actual, expected);
});

Deno.test("MyAnimeList parseManga title is number", () => {
  const data: unknown = {
    "id": 104156156,
    "status": 6,
    "score": 0,
    "tags": "",
    "is_rereading": 0,
    "num_read_chapters": 0,
    "num_read_volumes": 0,
    "created_at": 1618138466,
    "manga_title": 86,
    "manga_english": "86\u2014Eighty-Six",
    "manga_num_chapters": 0,
    "manga_num_volumes": 0,
    "manga_publishing_status": 1,
    "manga_id": 104039,
    "manga_magazines": null,
    "manga_total_members": 38101,
    "manga_total_scores": 9509,
    "manga_score_val": 8.81,
    "manga_score_diff": -99,
    "manga_popularity": 434,
    "genres": [{ "id": 1, "name": "Action" }, { "id": 8, "name": "Drama" }, {
      "id": 24,
      "name": "Sci-Fi",
    }],
    "demographics": [],
    "title_localized": null,
    "manga_url": "\/manga\/104039\/86",
    "manga_image_path":
      "https:\/\/cdn.myanimelist.net\/r\/192x272\/images\/manga\/3\/194315.webp?s=839f12808cbdb7ed328d2240be511b55",
    "is_added_to_list": true,
    "manga_media_type_string": "Light Novel",
    "start_date_string": null,
    "finish_date_string": null,
    "manga_start_date_string": "10-02-17",
    "manga_end_date_string": null,
    "days_string": null,
    "retail_string": null,
    "priority_string": "Low",
    "notes": "",
    "editable_notes": "",
  };

  const expected: MangaEntity = {
    id: 104039,
    title: 86,
    status: "planned",
    score: 0,
    chaptersRead: 0,
    volumesRead: 0,
    source: "mal",
  };

  const actual = parseManga(data);

  assertEquals(actual, expected);
});

Deno.test("MyAnimeList parseAnime throws on invalid data", () => {
  const data: unknown = {
    "id": 64738831,
    // "status": 1,
    "score": 10,
    "tags": "",
    "is_rereading": 0,
    "num_read_chapters": 66,
    "num_read_volumes": 0,
    "created_at": 1514826517,
    "manga_title": "Houseki no Kuni",
    "manga_english": "Land of the Lustrous",
    "manga_num_chapters": 0,
    "manga_num_volumes": 0,
    "manga_publishing_status": 1,
    "manga_id": 44489,
    "manga_magazines": null,
    "manga_total_members": 123962,
    "manga_total_scores": 38717,
    "manga_score_val": 8.96,
    "manga_score_diff": 1.04,
    "manga_popularity": 94,
    "genres": [{ "id": 1, "name": "Action" }, { "id": 8, "name": "Drama" }, {
      "id": 10,
      "name": "Fantasy",
    }],
    "demographics": [{ "id": 41, "name": "Seinen" }],
    "title_localized": null,
    "manga_url": "\/manga\/44489\/Houseki_no_Kuni",
    "manga_image_path":
      "https:\/\/cdn.myanimelist.net\/r\/192x272\/images\/manga\/1\/115443.webp?s=4c56d9e5c24846805e6a3d6e2848c2ea",
    "is_added_to_list": true,
    "manga_media_type_string": "Manga",
    "start_date_string": null,
    "finish_date_string": null,
    "manga_start_date_string": "25-10-12",
    "manga_end_date_string": null,
    "days_string": null,
    "retail_string": null,
    "priority_string": "Low",
    "notes": "",
    "editable_notes": "",
  };

  assertThrows(() => {
    parseManga(data);
  });
});
