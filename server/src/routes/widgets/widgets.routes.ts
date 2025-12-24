import {
  createWidget,
  deleteWidget,
  getWidgetById,
  getWidgets,
  getWidgetValue,
  saveLayout,
} from "@/services/widgets.service";
import { Elysia, t } from "elysia";
import { createWidgetSchema, getWidgetValueSchema } from "./widgets.schema";

export const widgetsRoutes = new Elysia({ prefix: "/widgets" })
  .get("/", () => getWidgets(), {
    response: t.Array(
      t.Object({
        id: t.Integer(),
        typeId: t.String(),
        x: t.Number(),
        y: t.Number(),
        width: t.Number(),
        height: t.Number(),
        pollInterval: t.Nullable(t.Integer()),
        config: t.Unknown(),
      }),
    ),
  })
  .get(
    "/:id",
    ({ params: { id } }) => {
      return getWidgetById(id);
    },
    {
      params: getWidgetValueSchema,
    },
  )
  .get(
    "/:id/value",
    ({ params: { id } }) => {
      return getWidgetValue(id);
    },
    {
      params: getWidgetValueSchema,
    },
  )
  .post("/", ({ body }) => createWidget(body), {
    body: createWidgetSchema,
  })
  .post("/layout", ({ body }) => saveLayout(body), {
    body: t.Array(
      t.Object({
        i: t.String(),
        x: t.Number(),
        y: t.Number(),
        w: t.Number(),
        h: t.Number(),
      }),
    ),
  })
  .delete(
    "/:id",
    ({ params: { id } }) => {
      deleteWidget(id);
    },
    {
      params: t.Object({
        id: t.Integer(),
      }),
    },
  );
