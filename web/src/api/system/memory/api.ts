import { fetchApi } from '@/api/client'

type MemoryData = {
  total: number
  used: number
  free: number
  cached: number
  usedPercentage: number
}

export const getMemory = () => fetchApi<MemoryData>('/system/memory')
