import { RadarrClient } from "tsarr"
import { getRadarrValue } from "../services/radarr"
import type { IWidgetProvider } from "./IWidgetProvider"

export class RadarrProvider implements IWidgetProvider<{
  apiKey: string
  url: string
}> {
  async getValue(config: { apiKey: string; url: string }) {
    if (!config.apiKey || !config.url)
      throw new Error("Missing apiKey or url from config.")

    const radarr = new RadarrClient({
      baseUrl: config.url,
      apiKey: config.apiKey,
    })

    const results = await getRadarrValue(radarr)

    return { ...results, url: config.url }
  }
}
