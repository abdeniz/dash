import type { SonarrClient } from "tsarr"

const request = async (path: string, url: string, apiKey: string) => {
  const res = await fetch(`${url}/api/v3${path}`, {
    headers: {
      "X-Api-Key": apiKey,
    },
  })
  return res.json()
}

const getQueue = async (url: string, apiKey: string) => {
  return request("/queue", url, apiKey)
}

const getSeries = async (sonarr: SonarrClient) => {
  return await sonarr.getSeries()
}

export const getSonarrValue = async (
  sonarr: SonarrClient,
  url: string,
  apiKey: string,
) => {
  const { data: shows } = await getSeries(sonarr)
  const { data: queue } = await getQueue(url, apiKey)

  const total = shows?.length
  const missing = shows
    ?.map((show: any) => {
      const missingCount =
        show.statistics.totalEpisodeCount - show.statistics.episodeFileCount
      return missingCount > 0
        ? {
            id: show.id,
            title: show.title,
            missingEpisodes: missingCount,
            year: show.year,
          }
        : null
    })
    .filter(Boolean)

  const queued = queue?.totalRecords ?? 0

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
  }
}
