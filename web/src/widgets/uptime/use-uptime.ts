import { getUptime } from '@/api/uptime/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type Uptime = {
  h: number
  m: number
  s: number
}

export function useUptime(): { uptime: Uptime | null; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ['system', 'uptime'],
    queryFn: getUptime,
  })

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
