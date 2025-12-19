import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { bytesToMegabytes } from '@/lib/utils'
import { ArrowDownIcon, ArrowUpIcon } from '@phosphor-icons/react'
import { useNetwork } from './use-network'

export function Network() {
  const { rx, tx, isLoading } = useNetwork()

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-4xl corner-squircle" />
  }

  const rxMB = bytesToMegabytes(rx ?? 0)
  const txMB = bytesToMegabytes(tx ?? 0)

  return (
    <Card>
      <CardContent className="h-full relative">
        <div className="flex w-full items-center justify-between gap-4 mb-1">
          <div className="flex flex-col justify-center w-full">
            <div className="flex gap-4 w-full">
              <div className="flex items-end-safe">
                <p className="font-normal text-2xl tracking-tightest text-primary">
                  {rxMB.toFixed(1)}
                </p>
                <div className="text-muted-foreground flex items-center">
                  <ArrowDownIcon size={18} weight="bold" />
                  <p className="text-xl font-normal">MB/s</p>
                </div>
              </div>

              <div className="flex items-end-safe">
                <p className="font-normal text-2xl tracking-tightest text-primary">
                  {txMB.toFixed(1)}
                </p>
                <div className="text-muted-foreground flex items-center">
                  <ArrowUpIcon size={18} weight="bold" />
                  <p className="text-xl font-normal">MB/s</p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-base uppercase tracking-wider">
              Network
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
