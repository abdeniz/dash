const RADARR_URL = process.env.RADARR_URL || "http://localhost:7878";
const RADARR_API_KEY = process.env.RADARR_API_KEY || "";

const headers = {
  "X-Api-Key": RADARR_API_KEY,
};

export const getQueue = async () => {
  const res = await fetch(`${RADARR_URL}/api/v3/queue`, { headers });
  return await res.json();
};

export const getRecentlyAdded = async () => {
  const res = await fetch(
    `${RADARR_URL}/api/v3/history/movie?sortKey=date&sortDir=desc&pageSize=5`,
    { headers }
  );
  return await res.json();
};

export const getStatus = async () => {
  const res = await fetch(`${RADARR_URL}/api/v3/system/status`, { headers });
  return await res.json();
};
