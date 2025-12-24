import { Card } from "@/components/ui/card"
import { CPU } from "./cpu/cpu"
import { Memory } from "./memory/memory"
import { Network } from "./network/network"
import { Radarr } from "./radarr/radarr"
import { Sonarr } from "./sonarr/sonarr"
import { WidgetProps } from "./types"
import { Uptime } from "./uptime/uptime"
import { WidgetActionsPopover } from "./widget-actions-popover"
import { WidgetType } from "@widgets/*"

const componentMap: Record<WidgetType, React.ComponentType<any>> = {
  cpu: CPU,
  memory: Memory,
  network: Network,
  uptime: Uptime,
  radarr: Radarr,
  sonarr: Sonarr,
}

export const Widget = ({
  widget: { id, pollInterval, typeId },
}: WidgetProps) => {
  const getWidget = (typeId: WidgetType) => {
    const Component = componentMap[typeId]

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
