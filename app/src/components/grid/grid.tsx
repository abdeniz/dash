import { useQuery } from "@tanstack/react-query"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"
import { fastVerticalCompactor } from "./compactor"
import type { Layout } from "react-grid-layout"
import type { WidgetType } from "@/widgets/definitions.gen"
import { Widget } from "@/widgets/widget"
import { useDashboardStore } from "@/stores/dashboard-store"
import { getWidgets } from "@/server/widgets"
import { definitions } from "@/widgets/definitions.gen"

export function Grid() {
  const { data } = useQuery({
    queryKey: ["widgets"],
    queryFn: async () => getWidgets(),
  })
  const { width, containerRef, mounted } = useContainerWidth()
  const layout = useDashboardStore((state) => state.layout)
  const setLayout = useDashboardStore((state) => state.setLayout)
  const editable = useDashboardStore((state) => state.editable)

  const onLayoutChange = (newLayout: Layout) => {
    setLayout([...newLayout])
  }

  return (
    <div ref={containerRef}>
      {mounted && (
        <ReactGridLayout
          onLayoutChange={onLayoutChange}
          layout={layout}
          compactor={fastVerticalCompactor}
          width={width}
          gridConfig={{ cols: 12, rowHeight: 38 }}
          resizeConfig={{
            enabled: editable,
          }}
          dragConfig={{
            enabled: editable,
          }}
        >
          {data?.map((widget) => {
            const maxes = definitions[widget.typeId as WidgetType].layout

            return (
              <div
                key={widget.id}
                data-grid={{
                  i: widget.id,
                  x: widget.x,
                  y: widget.y,
                  w: widget.width,
                  h: widget.height,
                  ...maxes,
                }}
              >
                <Widget widget={widget} />
              </div>
            )
          })}
        </ReactGridLayout>
      )}
    </div>
  )
}
