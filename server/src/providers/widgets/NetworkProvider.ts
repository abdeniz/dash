import { getNetwork } from "../clients/system";
import { IWidgetProvider } from "./IWidgetProvider";

export class NetworkProvider implements IWidgetProvider {
  async getValue() {
    return await getNetwork();
  }
}
