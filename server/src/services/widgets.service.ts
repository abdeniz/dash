import { orm } from "@/db";
import { widget as widgetSchema, WidgetInsert, Widget } from "@/db/schema";
import providers from "@/providers";
import { eq } from "drizzle-orm";
import { NotFoundError } from "elysia";

const widgetConfigCache = new Map<number, Widget>();

export async function getWidgets(): Promise<Widget[]> {
  return await orm.select().from(widgetSchema);
}

export async function getWidgetById(widgetId: number) {
  const widget = await orm
    .select()
    .from(widgetSchema)
    .where(eq(widgetSchema.id, widgetId));

  if (widget.length > 0) {
    return widget[0];
  }
}

export async function createWidget(input: WidgetInsert) {
  orm.insert(widgetSchema).values(input);
}

export async function getWidgetValue(widgetId: number) {
  const widget =
    widgetConfigCache.get(widgetId) ?? (await getWidgetById(widgetId));

  if (!widget) {
    throw new NotFoundError(`Widget ${widgetId} not found`);
  }

  const ProviderClass = providers[widget.typeId];
  const provider = new ProviderClass();
  return provider.getValue(JSON.parse(widget.config));
}
