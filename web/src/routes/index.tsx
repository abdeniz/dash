import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { Card, CardContent } from '@/components/ui/card'
import { CPU } from '@/widgets/cpu/cpu'
import { Memory } from '@/widgets/memory/memory'
import { Network } from '@/widgets/network/network'
import { Radarr } from '@/widgets/radarr/radarr'
import { Sonarr } from '@/widgets/sonarr/sonarr'
import { Uptime } from '@/widgets/uptime/uptime'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        <CPU />

        <Memory />

        <Network />

        <Uptime />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
        <Radarr />

        <Sonarr />

        <Card>
          <CardContent className="h-24">
            <AnimatedThemeToggler />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="h-24"></CardContent>
        </Card>
      </div>
    </div>
  )
}
