// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
export const definitions = {
  cpu: {
    type: "cpu",
    label: "CPU",
    category: "system",
    layout: {
      minW: 1,
      minH: 2,
      maxW: 3,
      maxH: 3,
    },
    config: {},
  },

  jellyfin: {
    type: "jellyfin",
    label: "Jellyfin",
    category: "media",
    layout: {
      minW: 4,
      minH: 4,
      maxW: 9,
      maxH: 6,
    },
    config: {
      url: {
        type: "string",
        required: true,
        label: "URL",
        secret: false,
      },
      apiKey: {
        type: "string",
        required: true,
        secret: true,
        label: "API Key",
      },
      docker: {
        type: "string",
        required: false,
        label: "Docker Container",
      },
    },
  },

  memory: {
    type: "memory",
    label: "Memory",
    category: "system",
    layout: {
      minW: 2,
      minH: 2,
      maxW: 3,
      maxH: 3,
    },
    config: {},
  },

  network: {
    type: "network",
    label: "Network",
    category: "system",
    layout: {
      minW: 3,
      minH: 2,
      maxW: 3,
      maxH: 3,
    },
    config: {},
  },

  radarr: {
    type: "radarr",
    label: "Radarr",
    category: "media",
    layout: {
      minW: 4,
      minH: 4,
      maxW: 9,
      maxH: 6,
    },
    config: {
      url: {
        type: "string",
        required: true,
        label: "URL",
        secret: false,
      },
      apiKey: {
        type: "string",
        required: true,
        secret: true,
        label: "API Key",
      },
      docker: {
        type: "string",
        required: false,
        label: "Docker Container",
      },
    },
  },

  sonarr: {
    type: "sonarr",
    label: "Sonarr",
    category: "media",
    layout: {
      minW: 4,
      minH: 4,
      maxW: 9,
      maxH: 6,
    },
    config: {
      url: {
        type: "string",
        required: true,
        label: "URL",
        secret: false,
      },
      apiKey: {
        type: "string",
        required: true,
        secret: true,
        label: "API Key",
      },
      docker: {
        type: "string",
        required: false,
        label: "Docker Container",
      },
    },
  },

  uptime: {
    type: "uptime",
    label: "Uptime",
    category: "system",
    layout: {
      minW: 3,
      minH: 2,
      maxW: 3,
      maxH: 3,
    },
    config: {},
  },
} as const

export type WidgetType = keyof typeof definitions
