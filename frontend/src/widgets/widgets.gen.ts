import { Cpu } from "./cpu/cpu"
import { Memory } from "./memory/memory"
import { Network } from "./network/network"
import { Uptime } from "./uptime/uptime"
import { Radarr } from "./radarr/radarr"
import { Sonarr } from "./sonarr/sonarr"
import { Jellyfin } from "./jellyfin/jellyfin"
import type { WidgetType } from "./definitions.gen"

export const widgets: Record<WidgetType, React.ComponentType<any>> = {
  cpu: Cpu,
  memory: Memory,
  network: Network,
  uptime: Uptime,
  radarr: Radarr,
  sonarr: Sonarr,
  jellyfin: Jellyfin,
}
