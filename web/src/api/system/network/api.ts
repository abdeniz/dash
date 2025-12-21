import { fetchApi } from '@/api/client'

type NetworkData = {
  rx: number
  tx: number
}

export const getNetwork = () => fetchApi<NetworkData>('/system/network')
