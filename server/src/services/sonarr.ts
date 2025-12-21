import { SonarrClient } from "tsarr";

const SONARR_URL = Bun.env.SONARR_URL!;
const SONARR_API_KEY = Bun.env.SONARR_API_KEY!;

const sonarr = new SonarrClient({
  baseUrl: SONARR_URL,
  apiKey: SONARR_API_KEY,
});

const request = async (path: string) => {
  const res = await fetch(`${SONARR_URL}/api/v3${path}`, {
    headers: {
      "X-Api-Key": SONARR_API_KEY,
    },
  });
  return res.json();
};

export const getQueue = async () => {
  return request("/queue");
};

export const getSeries = async () => {
  return await sonarr.getSeries();
};

export const getSonarrInfo = async () => {
  const { data: shows } = await getSeries();
  const { data: queue } = await getQueue();

  const total = shows?.length;
  const missing = shows
    ?.map((show: any) => {
      const missingCount =
        show.statistics.totalEpisodeCount - show.statistics.episodeFileCount;
      return missingCount > 0
        ? {
            id: show.id,
            title: show.title,
            missingEpisodes: missingCount,
            year: show.year,
          }
        : null;
    })
    .filter(Boolean);

  const queued = queue?.totalRecords ?? 0;

  return {
    shows: shows?.slice(0, 10).map((show) => ({
      id: show.id,
      title: show.title,
      year: show.year,
      status: show.status,
      images: show.images,
      titleSlug: show.titleSlug,
    })),
    total,
    missing,
    queued,
  };
};
