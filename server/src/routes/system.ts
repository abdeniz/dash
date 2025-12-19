import { Hono } from "hono";
import * as systemService from "../services/system";

const system = new Hono();

system.get("/cpu", async (c) => c.json(await systemService.getCpu()));
system.get("/memory", async (c) => c.json(await systemService.getMemory()));
system.get("/uptime", async (c) => c.json(await systemService.getUptime()));
system.get("/storage", async (c) => c.json(await systemService.getStorage()));
system.get("/network", async (c) => c.json(await systemService.getNetwork()));

export default system;
