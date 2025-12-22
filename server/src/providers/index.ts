import { CPUProvider } from "./widgets/CPUProvider";
import { MemoryProvider } from "./widgets/MemoryProvider";
import { NetworkProvider } from "./widgets/NetworkProvider";
import { RadarrProvider } from "./widgets/RadarrProvider";
import { UptimeProvider } from "./widgets/UptimeProvider";
import { IWidgetProvider } from "./widgets/WidgetProvider";

const providers: Record<string, new () => IWidgetProvider> = {
  // System
  cpu: CPUProvider,
  memory: MemoryProvider,
  network: NetworkProvider,
  uptime: UptimeProvider,

  // Media
  radarr: RadarrProvider,
};

export default providers;
