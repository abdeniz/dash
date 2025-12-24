import { Card } from "@/components/ui/card"
import { WidgetType } from "@widgets/*"
import { WidgetProps } from "./types"
import { WidgetActionsPopover } from "./widget-actions-popover"
import { widgets } from "./widgets.gen"

export const Widget = ({
  widget: { id, pollInterval, typeId },
}: WidgetProps) => {
  const getWidget = (typeId: WidgetType) => {
    const Component = widgets[typeId]

    return Component ? (
      <Component widget={{ id, pollInterval, typeId }} />
    ) : (
      <Card>Widget not found</Card>
    )
  }

  return (
    <div className="h-full w-full relative group">
      <WidgetActionsPopover widget={{ id, pollInterval, typeId }}>
        {getWidget(typeId as WidgetType)}
      </WidgetActionsPopover>
    </div>
  )
}
