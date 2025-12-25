import {
  ContainerInfo,
  ContainerStats,
} from "@/server/providers/services/docker"

export type Movie = {
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
  tmdbId: number
}

export type RadarrData = {
  total: number
  missing: Array<Movie>
  queued: number
  movies: Array<Movie>
  url: string
  docker: {
    stats: ContainerStats
    info: ContainerInfo
  }
}
