import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Widget Table
export const widget = sqliteTable("widget", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  typeId: text("type_id").notNull(),
  x: real("x").notNull(),
  y: real("y").notNull(),
  width: real("width").notNull(),
  height: real("height").notNull(),
  pollInterval: integer("poll_interval"),
  config: text("config", { mode: "json" }).notNull(),
});

// TypeScript types
export type Widget = typeof widget.$inferSelect;
export type WidgetInsert = typeof widget.$inferInsert;
