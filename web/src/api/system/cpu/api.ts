import { fetchApi } from '@/api/client'

type CPUData = {
  avg: number
  cores: number[]
}

export const getCPU = () => fetchApi<CPUData>('/system/cpu')
