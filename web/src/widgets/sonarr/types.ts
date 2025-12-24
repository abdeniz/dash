export type Show = {
  id: number
  title: string
  originalTitle: string
  status: string
  images: Array<{
    coverType: string
    url: string
    remoteUrl: string
  }>
  year: number
  titleSlug: string
}

type Missing = {
  id: string
  title: string
  missingEpisodes: number
  year: number
}

export type SonarrData = {
  total: number
  missing: Missing[]
  queued: number
  shows: Show[]
  url: string
}
