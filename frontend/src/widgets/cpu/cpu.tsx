import type { WidgetProps } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useWidgetData } from "@/hooks/use-widget-data"

export function Cpu(widget: WidgetProps) {
  const { data, isLoading } = useWidgetData<{ avg: number }>(widget)

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-4xl corner-squircle" />
  }

  return (
    <Card>
      <CardContent className="h-full relative w-full">
        <div className="flex items-start justify-between w-full h-full">
          <div className="flex w-full items-center justify-between gap-4 mb-1">
            <div className="flex flex-col justify-center">
              <div className="flex items-end-safe gap-0">
                <p className="font-normal text-2xl tracking-tightest text-primary">
                  {data?.avg?.toFixed(0) ?? 0}
                </p>
                <p className="text-muted-foreground text-xl font-normal">%</p>
              </div>
              <p className="text-muted-foreground text-base uppercase tracking-wider">
                CPU
              </p>
            </div>
          </div>
        </div>

        <FlickeringGrid
          width={400}
          height={400}
          className="absolute -top-12 left-30 h-full! w-full!"
          color="rgb(244, 129, 32)"
          maxOpacity={1}
          gridGap={5}
          squareSize={4}
        />

        <Progress
          className="absolute -bottom-2.5 left-0 w-full"
          value={data?.avg ?? 0}
        />
      </CardContent>
    </Card>
  )
}
