import { app } from "@/api/client"
import { useQuery } from "@tanstack/react-query"

const DEFAULT_POLL_INTERVAL = 5000

export function useWidgetData<TData>({
  widgetId,
  pollInterval,
}: {
  widgetId: number
  pollInterval: number | null
}): {
  data: TData
  isLoading: boolean
  error: Error | null
} {
  const { data, isLoading, error } = useQuery({
    queryKey: ["widget-data", widgetId],
    queryFn: () => app.widgets({ id: widgetId }).value.get(),
    refetchInterval: pollInterval ?? DEFAULT_POLL_INTERVAL,
  })

  return { data: data?.data as TData, isLoading, error }
}
