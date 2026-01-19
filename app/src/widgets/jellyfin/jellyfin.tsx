import { PlayIcon } from "@phosphor-icons/react"
import type { WidgetProps } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWidgetData } from "@/hooks/use-widget-data"
import { DockerStats } from "@/components/docker-stats"

export function Jellyfin({ widget }: WidgetProps) {
  const { data, isLoading } = useWidgetData<any>({ widget })

  if (isLoading || !data) {
    return <Skeleton className="h-full w-full rounded-4xl corner-squircle" />
  }

  return (
    <Card className="relative">
      <CardContent>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <div className="flex items-end gap-0.5">
              <p className="font-normal text-2xl tracking-tightest text-[#AA5CC3] tabular-nums leading-tight">
                {data.value.length}
              </p>
              <p className="text-muted-foreground text-xl font-normal uppercase">
                Active stream{data.value.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <PlayIcon weight="duotone" className="text-[#AA5CC3]" size={20} />

            <p className="text-muted-foreground text-base uppercase tracking-wider">
              Jellyfin
            </p>

            {data.docker && (
              <DockerStats stats={data.docker.stats} info={data.docker.info} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
