const PREFIX = "https://shikimori.one";

export const mangaUrl = (profileName: string) => {
  const url = new URL(`/${profileName}/list_export/mangas.json`, PREFIX);

  return url;
};

export const animeUrl = (profileName: string) => {
  const url = new URL(`/${profileName}/list_export/animes.json`, PREFIX);

  return url;
};
