import { Hono } from "hono";
import { corsMiddleware } from "./middlewares/cors";
import systemRoutes from "./routes/system";
import radarrRoutes from "./routes/radarr";
import sonarrRoutes from "./routes/sonarr";
const app = new Hono();

app.use("*", corsMiddleware);

app.get("/", (c) => c.text("Hello Hono!"));

// Routes
app.route("/api/system", systemRoutes);
app.route("/api/radarr", radarrRoutes);
app.route("/api/sonarr", sonarrRoutes);

const port = Number(process.env.PORT ?? 3001);

Bun.serve({
  port,
  fetch: app.fetch,
  hostname: "0.0.0.0",
});

// eslint-disable-next-line no-console
console.log(`Server running at http://localhost:${port}`);
