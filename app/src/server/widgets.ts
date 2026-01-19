import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"
import providers from "./providers/index.gen"
import type { Widget, WidgetInsert } from "@/db/schema"
import { orm } from "@/db"
import { widget as widgetSchema } from "@/db/schema"

// TODO: Update widget cache when widget config is modified
const widgetConfigCache = new Map<number, Widget>()

export const getWidgets = createServerFn().handler(async () => {
  const widgets = await orm.select().from(widgetSchema)
  return widgets.map((w) => ({ ...w, config: w.config as {} }))
})

export const getWidgetById = createServerFn()
  .inputValidator((data: number) => data)
  .handler(async ({ data: widgetId }) => {
    const widget = await orm
      .select()
      .from(widgetSchema)
      .where(eq(widgetSchema.id, widgetId))

    if (widget.length > 0) {
      return { ...widget[0], config: widget[0].config as {} }
    }
  })

export const createWidget = createServerFn({ method: "POST" })
  .inputValidator((data: Omit<WidgetInsert, "x" | "y">) => data)
  .handler(async ({ data: input }) => {
    const widgets = await getWidgets()

    const GRID_COLS = 12

    // Create a 2D grid map of occupied cells
    const occupied: Record<string, boolean> = {} // key = "x,y"

    for (const w of widgets) {
      for (let dx = 0; dx < w.width; dx++) {
        for (let dy = 0; dy < w.height; dy++) {
          occupied[`${w.x + dx},${w.y + dy}`] = true
        }
      }
    }

    // Find first available position
    let y = 0
    let x = 0

    outer: while (true) {
      for (x = 0; x <= GRID_COLS - input.width; x++) {
        let fits = true

        for (let dx = 0; dx < input.width; dx++) {
          for (let dy = 0; dy < input.height; dy++) {
            if (occupied[`${x + dx},${y + dy}`]) {
              fits = false
              break
            }
          }
          if (!fits) break
        }

        if (fits) {
          break outer // found a spot
        }
      }
      y++ // try next row
    }

    return await orm.insert(widgetSchema).values({ ...input, x, y })
  })

export const getWidgetValue = createServerFn()
  .inputValidator((data: { id: number }) => data)
  .handler(async ({ data }) => {
    const widget =
      widgetConfigCache.get(data.id) ?? (await getWidgetById({ data: data.id }))

    if (!widget) {
      throw new Error(`Widget ${data.id} not found`)
    }

    const ProviderClass = providers[widget.typeId as keyof typeof providers]
    const provider = new ProviderClass()
    return provider.getValue(widget.config as any)
  })

export const saveLayout = createServerFn({ method: "POST" })
  .inputValidator(
    (data: Array<{ i: string; x: number; y: number; w: number; h: number }>) =>
      data,
  )
  .handler(async ({ data: layout }) => {
    for (const item of layout) {
      await orm
        .update(widgetSchema)
        .set({ x: item.x, y: item.y, width: item.w, height: item.h })
        .where(eq(widgetSchema.id, Number(item.i)))
    }
  })

export const deleteWidget = createServerFn({ method: "POST" })
  .inputValidator((data: number) => data)
  .handler(async ({ data: widgetId }) => {
    return await orm.delete(widgetSchema).where(eq(widgetSchema.id, widgetId))
  })
