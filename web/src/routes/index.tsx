import { Card, CardContent } from '@/components/ui/card'
import { CPU } from '@/widgets/cpu/cpu'
import { Memory } from '@/widgets/memory/memory'
import { Network } from '@/widgets/network/network'
import { Uptime } from '@/widgets/uptime/uptime'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <CPU />

        <Memory />

        <Network />

        <Uptime />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="h-24"></CardContent>
        </Card>

        <Card>
          <CardContent className="h-24"></CardContent>
        </Card>

        <Card>
          <CardContent className="h-24"></CardContent>
        </Card>

        <Card>
          <CardContent className="h-24"></CardContent>
        </Card>
      </div>
    </div>
  )
}
