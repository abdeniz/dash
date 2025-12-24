import { getUptime } from "../clients/system";
import { IWidgetProvider } from "./IWidgetProvider";

export class UptimeProvider implements IWidgetProvider {
  async getValue() {
    return await getUptime();
  }
}
