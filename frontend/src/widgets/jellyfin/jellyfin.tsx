import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWidgetData } from "@/hooks/use-widget-data"
import { WidgetProps } from "../types"
import { JellyfinData } from "@server/src/providers/clients/jellyfin"
import { Progress } from "@/components/ui/progress"
import { PlayIcon, VideoIcon } from "@phosphor-icons/react"

export function Jellyfin({ widget }: WidgetProps) {
  const { data, isLoading } = useWidgetData<JellyfinData>({ widget })

  if (isLoading || !data) {
    return <Skeleton className="h-full w-full rounded-4xl corner-squircle" />
  }

  function formatTime(ticks: number) {
    // Jellyfin uses 10,000,000 ticks per second
    const totalSeconds = Math.floor(ticks / 10_000_000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }
  // TODO: Implement Jellyfin widget UI
  return (
    <Card className="relative">
      <CardContent>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <div className="flex items-end gap-0.5">
              <p className="font-normal text-2xl tracking-tightest text-[#AA5CC3] tabular-nums leading-tight">
                {data.length}
              </p>
              <p className="text-muted-foreground text-xl font-normal uppercase">
                Active stream{data.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <PlayIcon weight="duotone" className="text-[#AA5CC3]" size={20} />

            <p className="text-muted-foreground text-base uppercase tracking-wider">
              Jellyfin
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
