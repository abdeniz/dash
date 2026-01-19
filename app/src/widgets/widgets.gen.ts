// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
import { Cpu } from "./cpu/cpu"
import { Jellyfin } from "./jellyfin/jellyfin"
import { Memory } from "./memory/memory"
import { Network } from "./network/network"
import { Radarr } from "./radarr/radarr"
import { Sonarr } from "./sonarr/sonarr"
import { Uptime } from "./uptime/uptime"
import type { WidgetType } from "./definitions.gen"

export const widgets: Record<WidgetType, React.ComponentType<any>> = {
  cpu: Cpu,
  jellyfin: Jellyfin,
  memory: Memory,
  network: Network,
  radarr: Radarr,
  sonarr: Sonarr,
  uptime: Uptime,
}
