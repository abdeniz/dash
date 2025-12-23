export const widgetTypes: Record<
  string,
  { maxW: number; maxH: number; minW: number; minH: number }
> = {
  cpu: {
    maxW: 3,
    maxH: 3,
    minW: 1,
    minH: 2,
  },
  memory: {
    maxW: 3,
    maxH: 3,
    minW: 2,
    minH: 2,
  },
  network: {
    maxW: 3,
    maxH: 3,
    minW: 3,
    minH: 2,
  },
  uptime: {
    maxW: 3,
    maxH: 3,
    minW: 3,
    minH: 2,
  },
  radarr: {
    minH: 4,
    minW: 4,
    maxH: 6,
    maxW: 9,
  },
  sonarr: {
    minH: 4,
    minW: 4,
    maxH: 6,
    maxW: 9,
  },
} as const
