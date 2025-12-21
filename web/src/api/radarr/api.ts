import { fetchApi } from '@/api/client'
import { Data } from '../types'

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

type RadarrStatus = Data<{
  isProduction: boolean
  version: string
  startTime: Date
}>

export const getStatus = () => fetchApi<RadarrStatus>('/radarr/status')

export const getMovies = () => fetchApi<Data<Movie[]>>('/radarr/movies')

type Radarr = {
  total: number
  missing: Movie[]
  queued: number
  movies: Movie[]
}

export const getRadarr = () => fetchApi<Radarr>('/radarr')
