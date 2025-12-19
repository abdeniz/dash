import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { useCPU } from './use-cpu'

export function CPU() {
  const { avg, cores, isLoading } = useCPU()

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-4xl corner-squircle" />
  }

  return (
    <Card>
      <CardContent className="h-full relative">
        <div className="flex w-full items-center justify-between gap-4 mb-1">
          <div className="flex flex-col justify-center">
            <div className="flex items-end-safe gap-0">
              <p className="font-normal text-2xl tracking-tightest text-primary">
                {avg?.toFixed(0) ?? 0}
              </p>
              <p className="text-muted-foreground text-xl font-normal">%</p>
            </div>
            <p className="text-muted-foreground text-base uppercase tracking-wider">
              CPU
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className={`grid grid-cols-4 gap-0.5 px-1`}>
              {cores?.map((core, i) => (
                <div
                  key={i}
                  className="size-4 rounded-md border border-border"
                  style={{
                    backgroundColor: `hsl(${120 - core * 1.2}, 60%, 40%)`,
                    animation: `pulse-core ${2 + Math.random()}s infinite alternate`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <Progress
          className="absolute -bottom-2 left-0 w-full"
          value={avg ?? 0}
        />
      </CardContent>
    </Card>
  )
}
