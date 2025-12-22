import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { widgetsRoutes } from "./routes/widgets/widgets.routes";

const app = new Elysia()
  .use(
    cors({
      origin: "*",
    }),
  )
  .use(widgetsRoutes)
  .get("/", () => "root")
  .listen(3003);

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
