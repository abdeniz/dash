export type WidgetProps = {
  widget: {
    id: number
    pollInterval: number | null
    typeId: string
  }
}

export type FieldType = "string" | "number"

export type WidgetFieldDefinition = {
  type: FieldType
  required: boolean
  secret: boolean
  label?: string
  default?: string | number
}

export type WidgetLayout = {
  minW: number
  minH: number
  maxW: number
  maxH: number
}

export type WidgetDefinition = {
  type: string
  label: string
  category: string
  layout: WidgetLayout
  config?: Record<string, WidgetFieldDefinition>
}
