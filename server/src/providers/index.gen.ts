import { CpuProvider } from "./widgets/CpuProvider";
import { MemoryProvider } from "./widgets/MemoryProvider";
import { NetworkProvider } from "./widgets/NetworkProvider";
import { UptimeProvider } from "./widgets/UptimeProvider";
import { RadarrProvider } from "./widgets/RadarrProvider";
import { SonarrProvider } from "./widgets/SonarrProvider";
import { IWidgetProvider } from "./widgets/IWidgetProvider";

const providers: Record<string, new () => IWidgetProvider> = {
  cpu: CpuProvider,
  memory: MemoryProvider,
  network: NetworkProvider,
  uptime: UptimeProvider,
  radarr: RadarrProvider,
  sonarr: SonarrProvider,
};

export default providers;
