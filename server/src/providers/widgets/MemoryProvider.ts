import { getMemory } from "../clients/system";
import { IWidgetProvider } from "./IWidgetProvider";

export class MemoryProvider implements IWidgetProvider {
  async getValue() {
    return await getMemory();
  }
}
