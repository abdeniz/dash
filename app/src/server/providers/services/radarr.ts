import type { RadarrClient } from "tsarr"

const getQueue = async (radarr: RadarrClient) => {
  return await radarr.getQueue()
}

const getMovies = async (radarr: RadarrClient) => {
  return await radarr.getMovies()
}

export const getRadarrValue = async (radarr: RadarrClient) => {
  const { data: movies } = await getMovies(radarr)
  const { data: queue } = await getQueue(radarr)

  const total = movies?.length
  const missing = movies?.filter((m) => !m.hasFile)
  const queued = queue?.totalRecords

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
  }
}
