import { RadarrClient } from "tsarr";
import { IWidgetProvider } from "./WidgetProvider";
import { getRadarrValue } from "../clients/radarr";

export class RadarrProvider implements IWidgetProvider<{
  apiKey: string;
  url: string;
}> {
  async getValue(config: { apiKey: string; url: string }) {
    if (!config.apiKey || !config.url)
      throw new Error("Missing apiKey or url from config.");

    const radarr = new RadarrClient({
      baseUrl: config.url,
      apiKey: config.apiKey,
    });

    const results = await getRadarrValue(radarr);

    return { ...results, url: config.url };
  }
}
