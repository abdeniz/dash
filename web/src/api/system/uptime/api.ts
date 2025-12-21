import { fetchApi } from '@/api/client'

export const getUptime = () => fetchApi<{ uptime: number }>('/system/uptime')
