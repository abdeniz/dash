import { definitions, WidgetType } from "@/widgets/definitions.gen"

/**
 * Helper type to convert widget config schema to runtime TypeScript types
 * Maps schema field types to actual TypeScript types
 */
type SchemaFieldToType<T> = T extends { type: "string"; required: true }
  ? string
  : T extends { type: "string"; required: false }
    ? string | undefined
    : T extends { type: "number"; required: true }
      ? number
      : T extends { type: "number"; required: false }
        ? number | undefined
        : T extends { type: "boolean"; required: true }
          ? boolean
          : T extends { type: "boolean"; required: false }
            ? boolean | undefined
            : never

/**
 * Extract config type from widget definition
 * Converts the config schema object into a proper TypeScript interface
 *
 * @example
 * type RadarrConfig = WidgetConfig<"radarr">
 * // { url: string; apiKey: string; docker: string | undefined }
 */
export type WidgetConfig<T extends WidgetType> =
  (typeof definitions)[T]["config"] extends infer Config
    ? Config extends Record<string, any>
      ? {
          [K in keyof Config]: SchemaFieldToType<Config[K]>
        }
      : Record<string, never>
    : never
