import { orm } from "@/db";
import { widget as widgetSchema, WidgetInsert, Widget } from "@/db/schema";
import providers from "@/providers/index.gen";
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

export async function createWidget(input: Omit<WidgetInsert, "x" | "y">) {
  const widgets = await getWidgets();

  const GRID_COLS = 12;

  // Create a 2D grid map of occupied cells
  const occupied: Record<string, boolean> = {}; // key = "x,y"

  for (const w of widgets) {
    for (let dx = 0; dx < w.width; dx++) {
      for (let dy = 0; dy < w.height; dy++) {
        occupied[`${w.x + dx},${w.y + dy}`] = true;
      }
    }
  }

  // Find first available position
  let y = 0;
  let x = 0;

  outer: while (true) {
    for (x = 0; x <= GRID_COLS - input.width; x++) {
      let fits = true;

      for (let dx = 0; dx < input.width; dx++) {
        for (let dy = 0; dy < input.height; dy++) {
          if (occupied[`${x + dx},${y + dy}`]) {
            fits = false;
            break;
          }
        }
        if (!fits) break;
      }

      if (fits) {
        break outer; // found a spot
      }
    }
    y++; // try next row
  }

  return await orm.insert(widgetSchema).values({ ...input, x, y });
}

export async function getWidgetValue(widgetId: number) {
  const widget =
    widgetConfigCache.get(widgetId) ?? (await getWidgetById(widgetId));

  if (!widget) {
    throw new NotFoundError(`Widget ${widgetId} not found`);
  }

  const ProviderClass = providers[widget.typeId];
  const provider = new ProviderClass();
  return provider.getValue(widget.config);
}

export async function saveLayout(
  layout: Array<{ i: string; x: number; y: number; w: number; h: number }>,
) {
  for (const item of layout) {
    await orm
      .update(widgetSchema)
      .set({ x: item.x, y: item.y, width: item.w, height: item.h })
      .where(eq(widgetSchema.id, Number(item.i)));
  }
}

export async function deleteWidget(widgetId: number) {
  return await orm.delete(widgetSchema).where(eq(widgetSchema.id, widgetId));
}
