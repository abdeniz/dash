import { Card, CardContent } from '@/components/ui/card'

import { Skeleton } from '@/components/ui/skeleton'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useSonarr } from './use-sonarr'
import { ShowCarousel } from './show-carousel'

export function Sonarr() {
  const { total, queued, missing, shows, isLoading } = useSonarr()

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
                Shows
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
                    {missing?.reduce(
                      (sum, item) => sum + item.missingEpisodes,
                      0,
                    )}
                  </p>
                  <p className="text-muted-foreground text-xl font-normal uppercase group-hover:underline">
                    Missing
                  </p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <ul>
                  {missing?.map((show) => (
                    <li>
                      <h4>
                        {show.title} ({show.year}) | {show.missingEpisodes ?? 0}{' '}
                        episodes
                      </h4>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>

          <p className="text-muted-foreground text-base uppercase tracking-wider">
            Sonarr
          </p>
        </div>

        {shows && shows.length > 0 && <ShowCarousel shows={shows} />}
      </CardContent>
    </Card>
  )
}
