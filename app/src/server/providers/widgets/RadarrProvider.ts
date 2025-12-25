import { RadarrClient } from "tsarr"
import { getRadarrValue } from "../services/radarr"
import { getDockerData } from "../services/docker"
import type { IWidgetProvider } from "./IWidgetProvider"
import { WidgetConfig } from "./types"

export class RadarrProvider implements IWidgetProvider<WidgetConfig<"radarr">> {
  async getValue(config: WidgetConfig<"radarr">) {
    if (!config.apiKey || !config.url)
      throw new Error("Missing apiKey or url from config.")

    const radarr = new RadarrClient({
      baseUrl: config.url,
      apiKey: config.apiKey,
    })

    const results = await getRadarrValue(radarr)
    const docker = await getDockerData(config.docker)

    return {
      ...results,
      url: config.url,
      docker,
    }
  }
}
