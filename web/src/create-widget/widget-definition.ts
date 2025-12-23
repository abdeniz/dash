export const widgetDefinitions = {
  memory: {
    type: "memory",
    label: "Memory Usage",
    category: "system",
  },

  radarr: {
    type: "radarr",
    label: "Radarr",
    category: "media",
    configSchema: {
      url: { type: "string", required: true },
      apiKey: { type: "string", required: true, secret: true },
    },
  },
} as const
