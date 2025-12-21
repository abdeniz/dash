import { Card, CardContent } from '@/components/ui/card'

import { Skeleton } from '@/components/ui/skeleton'
import { MovieCarousel } from './movie-carousel'
import { useRadarr } from './use-radarr'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export function Radarr() {
  const { total, queued, missing, movies, isLoading } = useRadarr()

  if (isLoading) {
    return <Skeleton className="h-40 w-full rounded-4xl corner-squircle" />
  }

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

          <p className="text-muted-foreground text-base uppercase tracking-wider">
            Radarr
          </p>
        </div>

        {movies && movies.length > 0 && <MovieCarousel movies={movies} />}
      </CardContent>
    </Card>
  )
}
