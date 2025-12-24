import { getNetwork } from "@/api/system/network/api"
import { useQuery } from "@tanstack/react-query"

export function useNetwork() {
  const { data, isLoading } = useQuery({
    queryKey: ["system", "network"],
    queryFn: getNetwork,
    refetchInterval: 1000,
  })

  return {
    ...data,
    isLoading,
  }
}
