import { getNetwork } from "../services/system"
import type { IWidgetProvider } from "./IWidgetProvider"

export class NetworkProvider implements IWidgetProvider {
  async getValue() {
    return await getNetwork()
  }
}
