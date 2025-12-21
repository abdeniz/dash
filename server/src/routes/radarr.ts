import * as radarrService from "../services/radarr";
import { Hono } from "hono";

const radarr = new Hono();

radarr.get("/", async (c) => c.json(await radarrService.getRadarrInfo()));

export default radarr;
