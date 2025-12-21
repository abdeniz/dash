import { fetchApi } from '@/api/client'

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

type Sonarr = {
  total: number
  missing: Missing[]
  queued: number
  shows: Show[]
}

export const getSonarr = () => fetchApi<Sonarr>('/sonarr')
