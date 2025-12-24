import { createFileRoute } from "@tanstack/react-router"
import { Grid } from "@/components/grid/grid"
import { cn } from "@/lib/utils"
import { useDashboardStore } from "@/stores/dashboard-store"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const editable = useDashboardStore((state) => state.editable)

  return (
    <main
      className={cn(
        "relative max-w-400 mx-auto p-3 md:p-6",
        editable && "pt-14!",
      )}
    >
      <Grid />
    </main>
  )
}
