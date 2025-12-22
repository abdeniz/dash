import { app } from '@/api/client'
import { useQuery } from '@tanstack/react-query'

export function useWidgetData<TData>(widgetId: number): {
  data: TData
  isLoading: boolean
  error: Error | null
} {
  const { data, isLoading, error } = useQuery({
    queryKey: ['widget-data', widgetId],
    queryFn: () => app.widgets({ id: widgetId }).value.get(),
  })

  return { data: data?.data as TData, isLoading, error }
}
