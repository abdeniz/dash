import { getCpu } from "../clients/system";
import { IWidgetProvider } from "./WidgetProvider";

export class CPUProvider implements IWidgetProvider {
  async getValue() {
    return await getCpu();
  }
}
