import { Card } from '@/components/ui/card'
import { CPU } from './cpu/cpu'
import { Memory } from './memory/memory'
import { Network } from './network/network'
import { Uptime } from './uptime/uptime'
import { Radarr } from './radarr/radarr'

type WidgetProps = {
  widgetId: number
}

export const Widget = ({
  widgetId,
  typeId,
}: WidgetProps & { typeId: string }) => {
  const getWidget = (typeId: string) => {
    switch (typeId) {
      case 'cpu':
        return <CPU widgetId={widgetId} />
      case 'memory':
        return <Memory widgetId={widgetId} />
      case 'network':
        return <Network widgetId={widgetId} />
      case 'uptime':
        return <Uptime widgetId={widgetId} />
      case 'radarr':
        return <Radarr widgetId={widgetId} />
      default:
        return <Card>Widget not found</Card>
    }
  }

  return getWidget(typeId)
}
