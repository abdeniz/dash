import { useState } from "react"
import { WidgetActions } from "./widget-actions"
import type { WidgetProps } from "./types"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDashboardStore } from "@/stores/dashboard-store"

type WidgetActionsPopoverProps = {
  widget: WidgetProps["widget"]
  children: React.ReactNode
}

export function WidgetActionsPopover({
  children,
  widget,
}: WidgetActionsPopoverProps) {
  const [open, setOpen] = useState(false)
  const editable = useDashboardStore((state) => state.editable)

  if (!editable) {
    return <>{children}</>
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <div
            className="w-full h-full"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {children}
          </div>
        }
      ></PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        className="w-full"
        sideOffset={-3}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <WidgetActions widget={widget} />
      </PopoverContent>
    </Popover>
  )
}
