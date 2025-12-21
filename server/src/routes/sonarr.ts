import * as sonarrService from "../services/sonarr";
import { Hono } from "hono";

const sonarr = new Hono();

sonarr.get("/", async (c) => c.json(await sonarrService.getSonarrInfo()));

export default sonarr;
