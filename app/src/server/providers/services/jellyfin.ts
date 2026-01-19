import { Jellyfin } from "@jellyfin/sdk"
import { getSessionApi } from "@jellyfin/sdk/lib/utils/api/session-api"
import type { SessionInfoDto } from "@jellyfin/sdk/lib/generated-client"
import type { WidgetConfig } from "../widgets/types"

type ActiveStream = {
  username: string
  itemName: string
  itemType: string
  playMethod?: string
  deviceName?: string | null
  clientName?: string | null
  positionTicks?: number | null
  nowPlayingItem?: {
    name: string
    type: string
    seriesName?: string | null
    seasonName?: string | null
    episodeTitle?: string | null
    year?: number | null
    runTimeTicks?: number | null
  }
}

export async function getJellyfinValue(
  config: WidgetConfig<"jellyfin">,
): Promise<Array<ActiveStream>> {
  try {
    // Initialize Jellyfin SDK
    const jellyfin = new Jellyfin({
      clientInfo: {
        name: "Dash",
        version: "0.0.1",
      },
      deviceInfo: {
        name: "Dash Server",
        id: "dash-server-001",
      },
    })

    const api = jellyfin.createApi(config.url)
    api.accessToken = config.apiKey

    const sessionApi = getSessionApi(api)

    const response = await sessionApi.getSessions()
    const sessions: Array<SessionInfoDto> = response.data

    const activeStreams: Array<ActiveStream> = sessions
      .filter((session) => session.NowPlayingItem)
      .map((session) => ({
        username: session.UserName ?? "Unknown User",
        itemName: session.NowPlayingItem?.Name ?? "Unknown",
        itemType: session.NowPlayingItem?.Type ?? "Unknown",
        playMethod: session.PlayState?.PlayMethod,
        deviceName: session.DeviceName,
        clientName: session.Client,
        positionTicks: session.PlayState?.PositionTicks,
        nowPlayingItem: session.NowPlayingItem
          ? {
              name: session.NowPlayingItem.Name ?? "",
              type: session.NowPlayingItem.Type ?? "",
              seriesName: session.NowPlayingItem.SeriesName,
              seasonName: session.NowPlayingItem.SeasonName,
              episodeTitle: session.NowPlayingItem.Name,
              year: session.NowPlayingItem.ProductionYear,
              runTimeTicks: session.NowPlayingItem.RunTimeTicks,
            }
          : undefined,
      }))

    return activeStreams
  } catch (error) {
    console.error("Error fetching Jellyfin active streams:", error)
    throw error
  }
}

export type JellyfinData = Awaited<ReturnType<typeof getJellyfinValue>>
