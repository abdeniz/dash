import { SonarrClient } from "tsarr";
import { IWidgetProvider } from "./IWidgetProvider";
import { getSonarrValue } from "../clients/sonarr";

export class SonarrProvider implements IWidgetProvider<{
  apiKey: string;
  url: string;
}> {
  async getValue(config: { apiKey: string; url: string }) {
    if (!config.apiKey || !config.url)
      throw new Error("Missing apiKey or url from config.");

    const sonarr = new SonarrClient({
      baseUrl: config.url,
      apiKey: config.apiKey,
    });

    const result = await getSonarrValue(sonarr, config.url, config.apiKey);

    return { ...result, url: config.url };
  }
}
