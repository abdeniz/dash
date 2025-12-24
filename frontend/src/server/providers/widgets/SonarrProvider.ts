import { SonarrClient } from "tsarr"
import { getSonarrValue } from "../services/sonarr"
import type { IWidgetProvider } from "./IWidgetProvider"

export class SonarrProvider implements IWidgetProvider<{
  apiKey: string
  url: string
}> {
  async getValue(config: { apiKey: string; url: string }) {
    if (!config.apiKey || !config.url)
      throw new Error("Missing apiKey or url from config.")

    const sonarr = new SonarrClient({
      baseUrl: config.url,
      apiKey: config.apiKey,
    })

    const result = await getSonarrValue(sonarr, config.url, config.apiKey)

    return { ...result, url: config.url }
  }
}
