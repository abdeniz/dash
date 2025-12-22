import { app } from '@/api/client'
import { Widget } from '@/widgets/widget'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { data } = useQuery({
    queryKey: ['widgets'],
    queryFn: async () => await app.widgets.get(),
  })

  return (
    <div
      className="grid-wrapper"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '8px',
      }}
    >
      {data?.data?.map((widget) => {
        return (
          <div
            key={widget.id}
            style={{
              gridColumnStart: widget.x + 1,
              gridColumnEnd: widget.x + 1 + widget.width,
              gridRowStart: widget.y + 1,
              gridRowEnd: widget.y + 1 + widget.height,
            }}
          >
            <Widget widgetId={widget.id} typeId={widget.typeId} />
          </div>
        )
      })}
    </div>
  )
}
