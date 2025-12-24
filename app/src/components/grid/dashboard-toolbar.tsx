import { useHotkeys } from "react-hotkeys-hook"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { ButtonGroup } from "../ui/button-group"
import { useDashboardStore } from "@/stores/dashboard-store"
import { AddWidgetDialog } from "@/add-widget/add-widget-dialog"
import { useSaveLayout } from "@/hooks/use-save-layout"
import { queryClient } from "@/routes/__root"

export function DashboardToolbar() {
  const { isPending, mutateAsync } = useSaveLayout()

  const editable = useDashboardStore((state) => state.editable)
  const toggleEditable = useDashboardStore((state) => state.toggleEditable)
  const isDirty = useDashboardStore((state) => state.isDirty)
  const reset = useDashboardStore((state) => state.reset)
  const setAddWidgetOpen = useDashboardStore((state) => state.setAddWidgetOpen)

  useHotkeys("s", async (e) => {
    e.preventDefault()
    if (editable && isDirty()) {
      await mutateAsync()
      toggleEditable()
      setAddWidgetOpen(false)
    }
  })

  useHotkeys("esc", (e) => {
    e.preventDefault()
    if (editable) {
      reset()
      toggleEditable()
      setAddWidgetOpen(false)
      queryClient.invalidateQueries({ queryKey: ["widgets"] })
    }
  })

  if (!editable) return null

  return (
    <div className="flex gap-2 items-center p-3 border-b fixed top-0 left-0 w-full bg-background z-10 justify-between">
      <AddWidgetDialog />

      <ButtonGroup>
        <Button
          onClick={async () => {
            if (editable) {
              reset()
              toggleEditable()
            }
          }}
          variant="outline"
          size="sm"
        >
          Cancel <Kbd>Esc</Kbd>
        </Button>

        <Button
          onClick={async () => {
            await mutateAsync()

            toggleEditable()
          }}
          disabled={isPending || !isDirty()}
          size="sm"
        >
          {isPending ? "Saving..." : "Save"} <Kbd>S</Kbd>
        </Button>
      </ButtonGroup>
    </div>
  )
}
