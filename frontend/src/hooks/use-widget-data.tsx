import { app } from "@/api/client"
import { WidgetProps } from "@/widgets/types"
import { useQuery } from "@tanstack/react-query"

const DEFAULT_POLL_INTERVAL = 5000

export function useWidgetData<TData>({ widget }: WidgetProps): {
  data: TData
  isLoading: boolean
  error: Error | null
} {
  const { data, isLoading, error } = useQuery({
    queryKey: ["widget-data", widget.id],
    queryFn: () => app.widgets({ id: widget.id }).value.get(),
    refetchInterval: widget.pollInterval ?? DEFAULT_POLL_INTERVAL,
  })

  return { data: data?.data as TData, isLoading, error }
}
