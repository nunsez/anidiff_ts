const SHIKI_PREFIX = "https://shikimori.one";
const MAL_PREFIX = "https://myanimelist.net";

let shikiName = "";
let malName = "";

export function setShikiName(name: string) {
  shikiName = name;
}

export function setMalName(name: string) {
  malName = name;
}

export function initSettings() {
  console.log("Enter Shikimori Profile name:");
  while (shikiName === "") {
    setShikiName(readValue("SHIKI_NAME"));
  }

  console.log("Enter Myanimelist Profile name:");
  while (malName === "") {
    setMalName(readValue("MAL_NAME"));
  }
}

function readValue(name: string) {
  const envValue = (Deno.env.get(name) ?? "").trim();

  if (envValue !== "") {
    return envValue;
  }

  return prompt("") ?? "";
}

export function shikiMangaUrl(): URL {
  const url = new URL(`/${shikiName}/list_export/mangas.json`, SHIKI_PREFIX);

  return url;
}

export function shikiAnimeUrl(): URL {
  const url = new URL(`/${shikiName}/list_export/animes.json`, SHIKI_PREFIX);

  return url;
}

export function malMangaUrl(offset: number) {
  const url = new URL(`/mangalist/${malName}/load.json`, MAL_PREFIX);
  url.searchParams.set("offset", offset.toString());

  const allStatuses = "7";
  url.searchParams.set("status", allStatuses);

  return url;
}

export function malAnimeUrl(offset: number) {
  const url = new URL(`/animelist/${malName}/load.json`, MAL_PREFIX);
  url.searchParams.set("offset", offset.toString());

  const allStatuses = "7";
  url.searchParams.set("status", allStatuses);

  return url;
}

export function malProfileUrl() {
  const url = new URL(`/profile/${malName}`, MAL_PREFIX);

  return url;
}
