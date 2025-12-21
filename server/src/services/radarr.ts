import { RadarrClient } from "tsarr";

const radarr = new RadarrClient({
  baseUrl: Bun.env.RADARR_URL!,
  apiKey: Bun.env.RADARR_API_KEY!,
});

export const getQueue = async () => {
  return await radarr.getQueue();
};

export const getStatus = async () => {
  return await radarr.getSystemStatus();
};

export const getMovies = async () => {
  return await radarr.getMovies();
};

export const getRadarrInfo = async () => {
  const { data: movies } = await getMovies();
  const { data: queue } = await getQueue();

  const total = movies?.length;
  const missing = movies?.filter((m) => !m.hasFile);
  const queued = queue?.totalRecords;

  return {
    movies: movies?.slice(0, 10).map((movie) => ({
      id: movie.id,
      title: movie.title,
      year: movie.year,
      status: movie.status,
      images: movie.images,
      tmdbId: movie.tmdbId,
    })),
    total,
    missing,
    queued,
  };
};
