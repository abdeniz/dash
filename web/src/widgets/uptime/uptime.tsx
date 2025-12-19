import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { UptimeDisplay } from './uptime-display'
import { useUptime } from './use-uptime'

export function Uptime() {
  const { uptime, isLoading } = useUptime()

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

        <div className="absolute -right-37 -top-16 w-48 h-48">
          <div className="relative">
            <img
              src="/img/ticks.png"
              className="absolute top-0 left-0 clock-rotate"
            />
            <img src="/img/hand.png" className="absolute top-0 left-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
