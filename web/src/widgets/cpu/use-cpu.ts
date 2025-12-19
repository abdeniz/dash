import { getCPU } from '@/api/cpu/api'
import { useQuery } from '@tanstack/react-query'

export function useCPU() {
  const { data, isLoading } = useQuery({
    queryKey: ['system', 'cpu'],
    queryFn: getCPU,
    refetchInterval: 3000,
  })

  return {
    ...data,
    isLoading,
  }
}
