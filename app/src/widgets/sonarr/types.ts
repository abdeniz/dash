import {
  ContainerInfo,
  ContainerStats,
} from "@/server/providers/services/docker"

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
  missing: Array<Missing>
  queued: number
  shows: Array<Show>
  url: string
  docker: {
    stats: ContainerStats
    info: ContainerInfo
  }
}
