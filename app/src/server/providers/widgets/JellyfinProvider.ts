import { getJellyfinValue } from "../services/jellyfin"
import type { JellyfinConfig } from "../services/jellyfin"
import type { IWidgetProvider } from "./IWidgetProvider"

export class JellyfinProvider implements IWidgetProvider {
  async getValue(config: JellyfinConfig): Promise<any> {
    return getJellyfinValue(config)
  }
}
