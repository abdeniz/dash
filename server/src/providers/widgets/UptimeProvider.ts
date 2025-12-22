import { getUptime } from "../clients/system";
import { IWidgetProvider } from "./WidgetProvider";

export class UptimeProvider implements IWidgetProvider {
  async getValue() {
    return await getUptime();
  }
}
