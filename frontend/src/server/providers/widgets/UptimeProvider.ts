import { getUptime } from "../services/system"
import type { IWidgetProvider } from "./IWidgetProvider"

export class UptimeProvider implements IWidgetProvider {
  async getValue() {
    return await getUptime()
  }
}
