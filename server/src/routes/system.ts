import { Hono } from "hono";
import * as systemService from "../services/system";

const system = new Hono();

system
  .get("/cpu", async (c) => c.json(await systemService.getCpu()))
  .get("/memory", async (c) => c.json(await systemService.getMemory()))
  .get("/uptime", async (c) => c.json(await systemService.getUptime()))
  .get("/storage", async (c) => c.json(await systemService.getStorage()))
  .get("/network", async (c) => c.json(await systemService.getNetwork()));

export default system;
