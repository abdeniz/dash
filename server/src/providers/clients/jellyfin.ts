import { Jellyfin } from "@jellyfin/sdk";
import { getSessionApi } from "@jellyfin/sdk/lib/utils/api/session-api";
import type { SessionInfoDto } from "@jellyfin/sdk/lib/generated-client";

export type JellyfinConfig = {
  url: string;
  apiKey: string;
};

type ActiveStream = {
  username: string;
  itemName: string;
  itemType: string;
  playMethod?: string;
  deviceName?: string | null;
  clientName?: string | null;
  nowPlayingItem?: {
    name: string;
    type: string;
    seriesName?: string | null;
    seasonName?: string | null;
    episodeTitle?: string | null;
    year?: number | null;
    runTimeTicks?: number | null;
  };
};

export async function getJellyfinValue(
  config: JellyfinConfig,
): Promise<ActiveStream[]> {
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
    });

    const api = jellyfin.createApi(config.url);
    api.accessToken = config.apiKey;

    const sessionApi = getSessionApi(api);

    const response = await sessionApi.getSessions();
    const sessions: SessionInfoDto[] = response.data;

    const activeStreams: ActiveStream[] = sessions
      .filter((session) => session.NowPlayingItem)
      .map((session) => ({
        username: session.UserName ?? "Unknown User",
        itemName: session.NowPlayingItem?.Name ?? "Unknown",
        itemType: session.NowPlayingItem?.Type ?? "Unknown",
        playMethod: session.PlayState?.PlayMethod,
        deviceName: session.DeviceName,
        clientName: session.Client,
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
      }));

    return activeStreams;
  } catch (error) {
    console.error("Error fetching Jellyfin active streams:", error);
    throw error;
  }
}
