import { memo } from "react"
import type { COBEOptions } from "cobe"
import type { Theme } from "@/providers/theme-provider"
import { Globe } from "@/components/ui/globe"

const HELSINKI_LOCATION: [number, number] = [60.1695, 24.9354]

interface NetworkGlobeProps {
  theme: Theme
}

function NetworkGlobeComponent({ theme }: NetworkGlobeProps) {
  const config: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: theme === "dark" ? 1 : 0,
    diffuse: 0.1,
    mapSamples: 11000,
    mapBrightness: 1,
    mapBaseBrightness: 0,
    baseColor: [1, 1, 1],
    markerColor: [1, 0.6, 0.2],
    glowColor: [1, 0.6, 0.2],
    opacity: 1,
    markers: [{ location: HELSINKI_LOCATION, size: 0.1 }],
  }

  return (
    <div className="absolute -right-29 sm:-right-42 2xl:-right-29 -top-5 w-75">
      <Globe config={config} />
    </div>
  )
}

// Memoized version
export const NetworkGlobe = memo(NetworkGlobeComponent)
