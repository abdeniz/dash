import { TelevisionIcon } from "@phosphor-icons/react"
import { ShowCarousel } from "./show-carousel"
import type { SonarrData } from "./types"
import type { WidgetProps } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { DockerStats } from "@/components/docker-stats"

import { Skeleton } from "@/components/ui/skeleton"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useWidgetData } from "@/hooks/use-widget-data"

export function Sonarr(widget: WidgetProps) {
  const { data, isLoading } = useWidgetData<SonarrData>(widget)

  if (isLoading || !data) {
    return <Skeleton className="h-full w-full rounded-4xl corner-squircle" />
  }

  const { total, queued, missing, shows, url } = data

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
                Show{total > 1 ? "s" : ""}
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
                <div className="flex items-end gap-0.5 cursor-pointer group/missing">
                  <p className="font-normal text-2xl tracking-tightest text-primary tabular-nums leading-tight">
                    {missing?.reduce(
                      (sum, item) => sum + item.missingEpisodes,
                      0,
                    )}
                  </p>
                  <p className="text-muted-foreground text-xl font-normal uppercase group-hover/missing:underline">
                    Missing
                  </p>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <ul>
                  {missing?.map((show) => (
                    <li>
                      <h4>
                        {show.title} ({show.year}) | {show.missingEpisodes ?? 0}{" "}
                        episodes
                      </h4>
                    </li>
                  ))}
                </ul>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div className="flex items-center gap-1">
            <TelevisionIcon
              weight="duotone"
              className="text-primary"
              size={20}
            />

            <p className="text-muted-foreground text-base uppercase tracking-wider">
              Sonarr
            </p>

            {data.docker && (
              <DockerStats stats={data.docker.stats} info={data.docker.info} />
            )}
          </div>
        </div>

        {shows && shows.length > 0 && <ShowCarousel shows={shows} url={url} />}
      </CardContent>
    </Card>
  )
}
