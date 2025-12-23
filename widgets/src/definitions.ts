export type FieldType = "string" | "number";

export type WidgetFieldDefinition = {
  type: FieldType;
  required?: boolean;
  secret?: boolean;
  default?: string | number;
};

export type WidgetLayout = {
  minW: number;
  minH: number;
  maxW: number;
  maxH: number;
};

export type WidgetDefinition = {
  type: string;
  label: string;
  category: string;
  layout: WidgetLayout;
  configSchema?: Record<string, WidgetFieldDefinition>;
};

export const definitions = {
  cpu: {
    type: "cpu",
    label: "CPU",
    category: "system",
    layout: { minW: 1, minH: 2, maxW: 3, maxH: 3 },
  },

  memory: {
    type: "memory",
    label: "Memory",
    category: "system",
    layout: { minW: 2, minH: 2, maxW: 3, maxH: 3 },
  },

  network: {
    type: "network",
    label: "Network",
    category: "system",
    layout: { minW: 3, minH: 2, maxW: 3, maxH: 3 },
  },

  uptime: {
    type: "uptime",
    label: "System",
    category: "system",
    layout: { minW: 3, minH: 2, maxW: 3, maxH: 3 },
  },

  radarr: {
    type: "radarr",
    label: "Radarr",
    category: "media",
    layout: { minW: 4, minH: 4, maxW: 9, maxH: 6 },
    configSchema: {
      url: { type: "string", required: true },
      apiKey: { type: "string", required: true, secret: true },
    },
  },

  sonarr: {
    type: "sonarr",
    label: "Sonarr",
    category: "media",
    layout: { minW: 4, minH: 4, maxW: 9, maxH: 6 },
    configSchema: {
      url: { type: "string", required: true },
      apiKey: { type: "string", required: true, secret: true },
    },
  },
} as const;

export type WidgetType = keyof typeof definitions;
