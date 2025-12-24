import { PenIcon, XIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import type { WidgetProps } from "./types"
import { Button } from "@/components/ui/button"
import { queryClient } from "@/routes/__root"
import { deleteWidget } from "@/server/widgets"

type WidgetActionsProps = {
  widget: WidgetProps["widget"]
}

export function WidgetActions({ widget }: WidgetActionsProps) {
  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ["delete-widget"],
    mutationFn: () => deleteWidget({ data: widget.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] })
    },
  })

  return (
    <div className="flex gap-2 items-center w-full">
      <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
        <PenIcon size={20} /> Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={(e) => {
          e.stopPropagation()

          const promise = deleteAsync()

          toast.promise(promise, {
            loading: "Deleting widget...",
            success: "Widget deleted",
            error: "Failed to delete widget",
          })
        }}
      >
        <XIcon size={20} /> Delete
      </Button>
    </div>
  )
}
