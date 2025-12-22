import { useWidgetData } from '@/hooks/use-widget-data'
import { useEffect, useState } from 'react'

type Uptime = {
  h: number
  m: number
  s: number
}

export function useUptime(widgetId: number): {
  uptime: Uptime | null
  isLoading: boolean
} {
  const { data, isLoading } = useWidgetData<{ uptime: number }>(widgetId)

  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (typeof data?.uptime !== 'number') return

    setTick(0)
    const id = setInterval(() => {
      setTick((t) => t + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [data?.uptime])

  if (typeof data?.uptime !== 'number') return { uptime: null, isLoading }

  return { uptime: formatUptime(data.uptime + tick), isLoading }
}

function formatUptime(seconds: number): Uptime {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  return { h, m, s }
}
