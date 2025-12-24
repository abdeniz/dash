import { useQuery } from "@tanstack/react-query"
import type { WidgetProps } from "@/widgets/types"
import { getWidgetValue } from "@/server/widgets"

const DEFAULT_POLL_INTERVAL = 5000

export function useWidgetData<TData>({ widget }: WidgetProps): {
  data: TData
  isLoading: boolean
  error: Error | null
} {
  const { data, isLoading, error } = useQuery({
    queryKey: ["widget-data", widget.id],
    queryFn: () => getWidgetValue({ data: { id: widget.id } }),
    refetchInterval: widget.pollInterval ?? DEFAULT_POLL_INTERVAL,
  })

  return { data: data as TData, isLoading, error }
}
