import { Card, CardContent } from '@/components/ui/card'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Skeleton } from '@/components/ui/skeleton'
import { useWidgetData } from '@/hooks/use-widget-data'
import { FilmStripIcon } from '@phosphor-icons/react'
import { WidgetProps } from '../types'
import { MovieCarousel } from './movie-carousel'

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

type RadarrData = {
  total: number
  missing: Movie[]
  queued: number
  movies: Movie[]
}

export function Radarr({ widgetId }: WidgetProps) {
  const { data, isLoading } = useWidgetData<RadarrData>(widgetId)

  if (isLoading || !data) {
    return <Skeleton className="h-40 w-full rounded-4xl corner-squircle" />
  }

  const { total, queued, missing, movies } = data

  return (
    <Card>
      <CardContent className="relative flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-end gap-0.5">
              <p className="font-normal text-2xl tracking-tightest text-primary tabular-nums leading-tight">
                {total}
              </p>
              <p className="text-muted-foreground text-xl font-normal uppercase">
                Movies
              </p>
            </div>

            <div className="flex items-end gap-0.5">
              <p className="font-normal text-2xl tracking-tightest text-primary tabular-nums leading-tight">
                {queued}
              </p>
              <p className="text-muted-foreground text-xl font-normal uppercase">
                Queued
              </p>
            </div>

            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-end gap-0.5 cursor-pointer group">
                  <p className="font-normal text-2xl tracking-tightest text-primary tabular-nums leading-tight">
                    {missing?.length}
                  </p>
                  <p className="text-muted-foreground text-xl font-normal uppercase group-hover:underline">
                    Missing
                  </p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <ul>
                  {missing?.map((movie) => (
                    <li>
                      <h4>
                        {movie.title} ({movie.year})
                      </h4>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex items-center gap-1">
            <FilmStripIcon
              weight="duotone"
              className="text-primary"
              size={20}
            />

            <p className="text-muted-foreground text-base uppercase tracking-wider">
              Radarr
            </p>
          </div>
        </div>

        {movies && movies.length > 0 && <MovieCarousel movies={movies} />}
      </CardContent>
    </Card>
  )
}
