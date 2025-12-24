import { app } from "@/api/client"
import { queryClient } from "@/routes/__root"
import { useDashboardStore } from "@/stores/dashboard-store"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export function useSaveLayout() {
  const layout = useDashboardStore((s) => s.layout)

  const mutation = useMutation({
    mutationFn: async () => app.widgets.layout.post(layout),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] })
      toast.success("Layout saved")
    },
  })

  return { ...mutation }
}
