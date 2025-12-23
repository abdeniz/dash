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
  missing: Movie[]
  queued: number
  movies: Movie[]
}
