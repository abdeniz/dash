import { Hono } from "hono";
import { corsMiddleware } from "./middlewares/cors";
import systemRoutes from "./routes/system";
import radarrRoutes from "./routes/radarr";
const app = new Hono();

app.use("*", corsMiddleware);

app.get("/", (c) => c.text("Hello Hono!"));

// Routes
app.route("/api/system", systemRoutes);
app.route("/radarr", radarrRoutes);

const port = Number(process.env.PORT ?? 3001);

Bun.serve({
  port,
  fetch: app.fetch,
});

console.log(`Server running at http://localhost:${port}`);
