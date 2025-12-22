import { getNetwork } from "../clients/system";
import { IWidgetProvider } from "./WidgetProvider";

export class NetworkProvider implements IWidgetProvider {
  async getValue() {
    return await getNetwork();
  }
}
