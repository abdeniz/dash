import { UptimeDisplay } from "./uptime-display"
import { useUptime } from "./use-uptime"
import type { WidgetProps } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function Uptime(widget: WidgetProps) {
  const { uptime, isLoading } = useUptime(widget)

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-4xl corner-squircle" />
  }

  return (
    <Card>
      <CardContent className="relative">
        <div className="flex items-center gap-1.5">
          <UptimeDisplay value={uptime?.h ?? 0} isPrimary>
            H
          </UptimeDisplay>

          <UptimeDisplay value={uptime?.m ?? 0}>M</UptimeDisplay>

          <UptimeDisplay value={uptime?.s ?? 0}>S</UptimeDisplay>
        </div>

        <p className="text-muted-foreground text-base uppercase tracking-wider">
          Uptime
        </p>

        <div className="absolute -right-20 -top-11 w-48 h-48">
          <div className="relative">
            <svg width="400" height="400" className="absolute -top-1 -left-1">
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="var(--secondary)"
                stroke="var(--border)"
                strokeWidth={1.5}
              />
            </svg>
            <img
              src="/img/ticks.png"
              className="absolute top-4 left-4 w-40 h-40 clock-rotate"
            />
            <img src="/img/hand.png" className="absolute top-0 left-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
