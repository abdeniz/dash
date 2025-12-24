import { getJellyfinValue, JellyfinConfig } from "../clients/jellyfin";
import { IWidgetProvider } from "./IWidgetProvider";

export class JellyfinProvider implements IWidgetProvider {
  async getValue(config: JellyfinConfig): Promise<any> {
    return getJellyfinValue(config);
  }
}
