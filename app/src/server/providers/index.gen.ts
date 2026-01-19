// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
import { CpuProvider } from "./widgets/CpuProvider"
import { JellyfinProvider } from "./widgets/JellyfinProvider"
import { MemoryProvider } from "./widgets/MemoryProvider"
import { NetworkProvider } from "./widgets/NetworkProvider"
import { RadarrProvider } from "./widgets/RadarrProvider"
import { SonarrProvider } from "./widgets/SonarrProvider"
import { UptimeProvider } from "./widgets/UptimeProvider"
import type { IWidgetProvider } from "./widgets/IWidgetProvider"

const providers: Record<string, new () => IWidgetProvider> = {
  cpu: CpuProvider,
  jellyfin: JellyfinProvider,
  memory: MemoryProvider,
  network: NetworkProvider,
  radarr: RadarrProvider,
  sonarr: SonarrProvider,
  uptime: UptimeProvider,
}

export default providers
