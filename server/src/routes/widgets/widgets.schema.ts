import { widget } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

export const selectWidgetSchema = createSelectSchema(widget);

export const createWidgetSchema = createInsertSchema(widget);

export const getWidgetValueSchema = t.Object({
  id: t.Number(),
});
