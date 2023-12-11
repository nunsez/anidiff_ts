import { assertEquals, assertThrows } from "std/assert/mod.ts";
import { parseAnime } from "./anime.ts";
import { type AnimeEntity } from "../../entities.ts";

Deno.test("MyAnimeList parseAnime title is string", () => {
  const data: unknown = {
    "status": 2,
    "score": 10,
    "tags": "",
    "is_rewatching": 0,
    "num_watched_episodes": 12,
    "created_at": 1514826505,
    "updated_at": 1586170004,
    "anime_title": "Houseki no Kuni",
    "anime_title_eng": "Land of the Lustrous",
    "anime_num_episodes": 12,
    "anime_airing_status": 2,
    "anime_id": 35557,
    "anime_studios": null,
    "anime_licensors": null,
    "anime_season": null,
    "anime_total_members": 449158,
    "anime_total_scores": 192161,
    "anime_score_val": 8.39,
    "anime_score_diff": 1.61,
    "anime_popularity": 485,
    "has_episode_video": false,
    "has_promotion_video": true,
    "has_video": true,
    "video_url": "\/anime\/35557\/Houseki_no_Kuni\/video",
    "genres": [{ "id": 1, "name": "Action" }, { "id": 8, "name": "Drama" }, {
      "id": 10,
      "name": "Fantasy",
    }, { "id": 7, "name": "Mystery" }],
    "demographics": [{ "id": 42, "name": "Seinen" }],
    "title_localized": null,
    "anime_url": "\/anime\/35557\/Houseki_no_Kuni",
    "anime_image_path":
      "https:\/\/cdn.myanimelist.net\/r\/192x272\/images\/anime\/3\/88293.webp?s=151e99791084db922185b4ff24705d07",
    "is_added_to_list": true,
    "anime_media_type_string": "TV",
    "anime_mpaa_rating_string": "PG-13",
    "start_date_string": "07-02-18",
    "finish_date_string": "12-02-18",
    "anime_start_date_string": "07-10-17",
    "anime_end_date_string": "23-12-17",
    "days_string": 6,
    "storage_string": "",
    "priority_string": "Low",
    "notes": "",
    "editable_notes": "",
  };

  const expected: AnimeEntity = {
    id: 35557,
    title: "Houseki no Kuni",
    status: "completed",
    score: 10,
    episodesWatched: 12,
    source: "mal",
  };

  const actual = parseAnime(data);

  assertEquals(actual, expected);
});

Deno.test("MyAnimeList parseAnime title is number", () => {
  const data: unknown = {
    "status": 2,
    "score": 8,
    "tags": "",
    "is_rewatching": 0,
    "num_watched_episodes": 11,
    "created_at": 1608640990,
    "updated_at": 1624190751,
    "anime_title": 86,
    "anime_title_eng": "86 Eighty-Six",
    "anime_num_episodes": 11,
    "anime_airing_status": 2,
    "anime_id": 41457,
    "anime_studios": null,
    "anime_licensors": null,
    "anime_season": null,
    "anime_total_members": 734961,
    "anime_total_scores": 377640,
    "anime_score_val": 8.29,
    "anime_score_diff": -0.29,
    "anime_popularity": 254,
    "has_episode_video": true,
    "has_promotion_video": true,
    "has_video": true,
    "video_url": "\/anime\/41457\/86\/video",
    "genres": [{ "id": 1, "name": "Action" }, { "id": 8, "name": "Drama" }, {
      "id": 24,
      "name": "Sci-Fi",
    }],
    "demographics": [],
    "title_localized": null,
    "anime_url": "\/anime\/41457\/86",
    "anime_image_path":
      "https:\/\/cdn.myanimelist.net\/r\/192x272\/images\/anime\/1987\/117507.webp?s=d836fc149fc0663724ae4e3566bf36c1",
    "is_added_to_list": true,
    "anime_media_type_string": "TV",
    "anime_mpaa_rating_string": "R",
    "start_date_string": "11-04-21",
    "finish_date_string": "20-06-21",
    "anime_start_date_string": "11-04-21",
    "anime_end_date_string": "20-06-21",
    "days_string": 71,
    "storage_string": "",
    "priority_string": "Low",
    "notes": "",
    "editable_notes": "",
  };

  const expected: AnimeEntity = {
    id: 41457,
    title: 86,
    status: "completed",
    score: 8,
    episodesWatched: 11,
    source: "mal",
  };

  const actual = parseAnime(data);

  assertEquals(actual, expected);
});

Deno.test("MyAnimeList parseAnime throws on invalid data", () => {
  const data: unknown = {
    // "status": 2,
    "score": 10,
    "tags": "",
    "is_rewatching": 0,
    "num_watched_episodes": 12,
    "created_at": 1514826505,
    "updated_at": 1586170004,
    "anime_title": "Houseki no Kuni",
    "anime_title_eng": "Land of the Lustrous",
    "anime_num_episodes": 12,
    "anime_airing_status": 2,
    "anime_id": 35557,
    "anime_studios": null,
    "anime_licensors": null,
    "anime_season": null,
    "anime_total_members": 449158,
    "anime_total_scores": 192161,
    "anime_score_val": 8.39,
    "anime_score_diff": 1.61,
    "anime_popularity": 485,
    "has_episode_video": false,
    "has_promotion_video": true,
    "has_video": true,
    "video_url": "\/anime\/35557\/Houseki_no_Kuni\/video",
    "genres": [{ "id": 1, "name": "Action" }, { "id": 8, "name": "Drama" }, {
      "id": 10,
      "name": "Fantasy",
    }, { "id": 7, "name": "Mystery" }],
    "demographics": [{ "id": 42, "name": "Seinen" }],
    "title_localized": null,
    "anime_url": "\/anime\/35557\/Houseki_no_Kuni",
    "anime_image_path":
      "https:\/\/cdn.myanimelist.net\/r\/192x272\/images\/anime\/3\/88293.webp?s=151e99791084db922185b4ff24705d07",
    "is_added_to_list": true,
    "anime_media_type_string": "TV",
    "anime_mpaa_rating_string": "PG-13",
    "start_date_string": "07-02-18",
    "finish_date_string": "12-02-18",
    "anime_start_date_string": "07-10-17",
    "anime_end_date_string": "23-12-17",
    "days_string": 6,
    "storage_string": "",
    "priority_string": "Low",
    "notes": "",
    "editable_notes": "",
  };

  assertThrows(() => {
    parseAnime(data);
  });
});
