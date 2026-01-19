export interface IWidgetProvider<TConfig = any> {
  getValue: (config: TConfig) => Promise<any>
}
