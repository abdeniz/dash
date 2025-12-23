import { app } from "@/api/client"
import { CommandMenu } from "@/components/command-menu"
import { Widget } from "@/widgets/widget"
import { widgetTypes } from "@/widgets/widget-types"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import ReactGridLayout, { useContainerWidth } from "react-grid-layout"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const { data } = useQuery({
    queryKey: ["widgets"],
    queryFn: async () => await app.widgets.get(),
  })

  const { width, containerRef, mounted } = useContainerWidth()

  return (
    <div>
      <CommandMenu />
      <div ref={containerRef}>
        {mounted && (
          <ReactGridLayout
            width={width}
            gridConfig={{ cols: 12, rowHeight: 38 }}
            resizeConfig={
              {
                // enabled: false,
              }
            }
            dragConfig={
              {
                // enabled: false,
              }
            }
          >
            {data?.data?.map((widget) => {
              const maxes = widgetTypes[widget.typeId]

              return (
                <div
                  key={widget.id}
                  data-grid={{
                    x: widget.x,
                    y: widget.y,
                    w: widget.width,
                    h: widget.height,
                    ...maxes,
                  }}
                >
                  <Widget
                    widgetId={widget.id}
                    typeId={widget.typeId}
                    pollInterval={widget.pollInterval}
                  />
                </div>
              )
            })}
          </ReactGridLayout>
        )}
      </div>
    </div>
  )
}
