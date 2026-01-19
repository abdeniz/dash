import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { queryClient } from "@/routes/__root"
import { saveLayout } from "@/server/widgets"
import { useDashboardStore } from "@/stores/dashboard-store"

export function useSaveLayout() {
  const layout = useDashboardStore((s) => s.layout)

  const mutation = useMutation({
    mutationFn: async () => saveLayout({ data: layout }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] })
      toast.success("Layout saved")
    },
  })

  return { ...mutation }
}
