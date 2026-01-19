import { getJellyfinValue } from "../services/jellyfin"
import { getDockerData } from "../services/docker"
import type { IWidgetProvider } from "./IWidgetProvider"
import type { WidgetConfig } from "./types"

export class JellyfinProvider implements IWidgetProvider<
  WidgetConfig<"jellyfin">
> {
  async getValue(config: WidgetConfig<"jellyfin">): Promise<any> {
    const result = await getJellyfinValue(config)
    const docker = await getDockerData(config.docker)

    return { value: result, docker }
  }
}
