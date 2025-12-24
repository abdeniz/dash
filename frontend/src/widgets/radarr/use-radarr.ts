import { getRadarr } from "@/api/radarr/api"
import { useQuery } from "@tanstack/react-query"

export function useRadarr() {
  const { data, isLoading } = useQuery({
    queryKey: ["radarr"],
    queryFn: getRadarr,
    refetchInterval: 60000,
    retry: false,
  })

  return {
    ...data,
    isLoading,
  }
}
