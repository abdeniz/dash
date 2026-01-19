import { useEffect, useState } from "react"
import type { WidgetProps } from "../types"
import { useWidgetData } from "@/hooks/use-widget-data"

type Uptime = {
  h: number
  m: number
  s: number
}

export function useUptime({ widget }: WidgetProps): {
  uptime: Uptime | null
  isLoading: boolean
} {
  const { data, isLoading } = useWidgetData<{ uptime: number }>({ widget })

  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (typeof data?.uptime !== "number") return

    setTick(0)
    const id = setInterval(() => {
      setTick((t) => t + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [data?.uptime])

  if (typeof data?.uptime !== "number") return { uptime: null, isLoading }

  return { uptime: formatUptime(data.uptime + tick), isLoading }
}

export function formatUptime(seconds: number): Uptime {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  return { h, m, s }
}
