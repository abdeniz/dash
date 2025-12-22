import { getSonarr } from '@/api/sonarr/api'
import { useQuery } from '@tanstack/react-query'

export function useSonarr() {
  const { data, isLoading } = useQuery({
    queryKey: ['sonarr'],
    queryFn: getSonarr,
    refetchInterval: 60000,
    retry: false,
  })

  return {
    ...data,
    isLoading,
  }
}
