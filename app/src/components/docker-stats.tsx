import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ContainerInfo,
  ContainerStats,
} from "@/server/providers/services/docker"
import { formatUptime } from "@/widgets/uptime/use-uptime"

interface DockerStatsProps {
  stats: ContainerStats | null
  info: ContainerInfo | null
}

export function DockerStats({ stats, info }: DockerStatsProps) {
  if (!stats && !info) {
    return null
  }

  const uptime = formatUptime(info?.uptime || 0)

  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="relative cursor-pointer size-5">
          <div className="bg-green-400 size-3 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="bg-green-400 size-3 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </TooltipTrigger>
      <TooltipContent align="center" side="top" className="w-lg">
        <div className="flex flex-col gap-2 relative">
          {info && (
            <div className="flex flex-col">
              <p className="font-semibold text-base">{info.name}</p>
              <p className="text-xs text-secondary font-medium">
                {info.status} · {uptime.h}h {uptime.m}m {uptime.s}s
              </p>
            </div>
          )}

          {stats ? (
            <ul className="text-sm flex flex-col gap-1">
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <div className="bg-primary h-4 w-1 rounded" />
                  CPU
                </div>
                <span className="tabular-nums">
                  {stats.cpuPercent.toFixed(2)}%
                </span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <div className="bg-primary h-4 w-1 rounded" />
                  Memory
                </div>
                <span className="tabular-nums">
                  {((stats.memoryUsageMB / stats.memoryLimitMB) * 100).toFixed(
                    2,
                  )}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <div className="bg-primary h-4 w-1 rounded" />
                  Network
                </div>
                <span className="tabular-nums">
                  RX{stats.networkRxMB.toFixed(2)}MB&nbsp; TX
                  {stats.networkTxMB.toFixed(2)}MB
                </span>
              </li>
            </ul>
          ) : (
            <p>No stats available</p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
