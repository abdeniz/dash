import { getMemory } from "@/api/system/memory/api"
import { useQuery } from "@tanstack/react-query"

export function useMemory() {
  const { data, isLoading } = useQuery({
    queryKey: ["system", "memory"],
    queryFn: getMemory,
    refetchInterval: 3000,
  })

  return {
    ...data,
    isLoading,
  }
}
