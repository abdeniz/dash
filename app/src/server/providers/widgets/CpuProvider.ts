import { getCpu } from "../services/system"
import type { IWidgetProvider } from "./IWidgetProvider"

export class CpuProvider implements IWidgetProvider {
  async getValue() {
    return await getCpu()
  }
}
