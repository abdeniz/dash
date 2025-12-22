import { SonarrClient } from "tsarr";
import { IWidgetProvider } from "./WidgetProvider";
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

    return await getSonarrValue(sonarr, config.url, config.apiKey);
  }
}
