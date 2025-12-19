import { Hono } from "hono";
import * as radarrService from "../services/radarr";

const radarr = new Hono();

radarr.get("/queue", async (c) => c.json(await radarrService.getQueue()));
radarr.get("/recent", async (c) =>
  c.json(await radarrService.getRecentlyAdded())
);
radarr.get("/status", async (c) => c.json(await radarrService.getStatus()));

export default radarr;
