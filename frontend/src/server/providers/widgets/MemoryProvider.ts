import { getMemory } from "../services/system"
import type { IWidgetProvider } from "./IWidgetProvider"

export class MemoryProvider implements IWidgetProvider {
  async getValue() {
    return await getMemory()
  }
}
