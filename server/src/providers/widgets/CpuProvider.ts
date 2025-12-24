import { getCpu } from "../clients/system";
import { IWidgetProvider } from "./IWidgetProvider";

export class CpuProvider implements IWidgetProvider {
  async getValue() {
    return await getCpu();
  }
}
