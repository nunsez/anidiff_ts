import { assertInstanceOf } from "std/assert/assert_instance_of.ts";
import { animeUrl, mangaUrl } from "./utils.ts";

Deno.test("Shikimori animeUrl returns valid URL", () => {
  assertInstanceOf(animeUrl("Foo"), URL);
});

Deno.test("Shikimori mangaUrl returns valid URL", () => {
  assertInstanceOf(mangaUrl("Foo"), URL);
});
