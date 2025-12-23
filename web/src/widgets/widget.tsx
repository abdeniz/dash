import { Card } from "@/components/ui/card"
import { CPU } from "./cpu/cpu"
import { Memory } from "./memory/memory"
import { Network } from "./network/network"
import { Uptime } from "./uptime/uptime"
import { Radarr } from "./radarr/radarr"
import { Sonarr } from "./sonarr/sonarr"

type WidgetProps = {
  widgetId: number
  pollInterval: number | null
  typeId: string
}

export const Widget = ({ widgetId, typeId, pollInterval }: WidgetProps) => {
  const getWidget = (typeId: string) => {
    const componentMap: Record<string, React.ComponentType<any>> = {
      cpu: CPU,
      memory: Memory,
      network: Network,
      uptime: Uptime,
      radarr: Radarr,
      sonarr: Sonarr,
    }

    const Component = componentMap[typeId]

    return Component ? (
      <Component metadata={{ widgetId, pollInterval }} />
    ) : (
      <Card>Widget not found</Card>
    )
  }

  return getWidget(typeId)
}
