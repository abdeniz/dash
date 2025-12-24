import { getCpu } from "../clients/system";
import { IWidgetProvider } from "./IWidgetProvider";

export class CPUProvider implements IWidgetProvider {
  async getValue() {
    return await getCpu();
  }
}
