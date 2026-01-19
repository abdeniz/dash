import { SonarrClient } from "tsarr"
import { getSonarrValue } from "../services/sonarr"
import { getDockerData } from "../services/docker"
import type { IWidgetProvider } from "./IWidgetProvider"
import { WidgetConfig } from "./types"

export class SonarrProvider implements IWidgetProvider<WidgetConfig<"sonarr">> {
  async getValue(config: WidgetConfig<"sonarr">) {
    if (!config.apiKey || !config.url)
      throw new Error("Missing apiKey or url from config.")

    const sonarr = new SonarrClient({
      baseUrl: config.url,
      apiKey: config.apiKey,
    })

    const result = await getSonarrValue(sonarr, config.url, config.apiKey)
    const docker = await getDockerData(config.docker)

    return {
      ...result,
      url: config.url,
      docker,
    }
  }
}
