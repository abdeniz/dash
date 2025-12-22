import { getMemory } from "../clients/system";
import { IWidgetProvider } from "./WidgetProvider";

export class MemoryProvider implements IWidgetProvider {
  async getValue() {
    return await getMemory();
  }
}
