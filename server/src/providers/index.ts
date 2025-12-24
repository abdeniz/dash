import { CPUProvider } from "./widgets/CPUProvider";
import { MemoryProvider } from "./widgets/MemoryProvider";
import { NetworkProvider } from "./widgets/NetworkProvider";
import { RadarrProvider } from "./widgets/RadarrProvider";
import { SonarrProvider } from "./widgets/SonarrProvider";
import { UptimeProvider } from "./widgets/UptimeProvider";
import { IWidgetProvider } from "./widgets/IWidgetProvider";

const providers: Record<string, new () => IWidgetProvider> = {
  // System
  cpu: CPUProvider,
  memory: MemoryProvider,
  network: NetworkProvider,
  uptime: UptimeProvider,

  // Media
  radarr: RadarrProvider,
  sonarr: SonarrProvider,
};

export default providers;
