const PREFIX = "https://myanimelist.net";

export const profileUrl = (profileName: string) => {
  const url = new URL(`/profile/${profileName}`, PREFIX);

  return url;
};

export const mangaUrl = (profileName: string) => (offset: number) => {
  const url = new URL(`/mangalist/${profileName}/load.json`, PREFIX);
  url.searchParams.set("offset", offset.toString());

  const allStatuses = "7";
  url.searchParams.set("status", allStatuses);

  return url;
};

export const animeUrl = (profileName: string) => (offset: number) => {
  const url = new URL(`/animelist/${profileName}/load.json`, PREFIX);

  const allStatuses = "7";
  url.searchParams.set("status", allStatuses);

  url.searchParams.set("offset", offset.toString());

  return url;
};
