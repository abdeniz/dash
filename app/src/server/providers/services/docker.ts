import Docker from "dockerode"

export interface ContainerStats {
  cpuPercent: number
  memoryUsageMB: number
  memoryLimitMB: number
  memoryPercent: number
  networkRxMB: number
  networkTxMB: number
}

export interface ContainerInfo {
  id: string
  name: string
  status: string
  state: string
  uptime: number
  image: string
}

let dockerClient: Docker | null = null

/**
 * Get or create local Docker client instance
 */
function getDockerClient(): Docker | null {
  if (dockerClient) return dockerClient

  try {
    dockerClient = new Docker({ socketPath: "/var/run/docker.sock" })
    return dockerClient
  } catch (error) {
    console.warn("Docker socket not available:", error)
    return null
  }
}

/**
 * Fetch Docker stats and info for a container (helper for providers)
 * Returns null values if Docker unavailable or container not found
 */
export async function getDockerData(containerName?: string) {
  if (!containerName) {
    return { stats: null, info: null }
  }

  try {
    const [stats, info] = await Promise.all([
      getContainerStats(containerName),
      getContainerInfo(containerName),
    ])
    return { stats, info }
  } catch (error) {
    console.warn(`Failed to fetch Docker data for ${containerName}:`, error)
    return { stats: null, info: null }
  }
}

/**
 * Get container stats (CPU, memory, network)
 * @param containerNameOrId - Container name or ID
 */
export async function getContainerStats(
  containerNameOrId: string,
): Promise<ContainerStats | null> {
  const client = getDockerClient()
  if (!client) return null

  try {
    const container = client.getContainer(containerNameOrId)
    const stats = await container.stats({ stream: false })

    // Calculate CPU percentage
    const cpuDelta =
      stats.cpu_stats.cpu_usage.total_usage -
      stats.precpu_stats.cpu_usage.total_usage
    const systemDelta =
      stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage
    const cpuPercent =
      systemDelta > 0
        ? (cpuDelta / systemDelta) * stats.cpu_stats.online_cpus * 100
        : 0

    // Calculate memory usage
    const memoryUsageMB = stats.memory_stats.usage / 1024 / 1024
    const memoryLimitMB = stats.memory_stats.limit / 1024 / 1024
    const memoryPercent =
      (stats.memory_stats.usage / stats.memory_stats.limit) * 100

    // Calculate network I/O
    let networkRxMB = 0
    let networkTxMB = 0
    if (stats.networks) {
      for (const iface of Object.values(stats.networks)) {
        networkRxMB += iface.rx_bytes / 1024 / 1024
        networkTxMB += iface.tx_bytes / 1024 / 1024
      }
    }

    return {
      cpuPercent: parseFloat(cpuPercent.toFixed(2)),
      memoryUsageMB: parseFloat(memoryUsageMB.toFixed(2)),
      memoryLimitMB: parseFloat(memoryLimitMB.toFixed(2)),
      memoryPercent: parseFloat(memoryPercent.toFixed(2)),
      networkRxMB: parseFloat(networkRxMB.toFixed(2)),
      networkTxMB: parseFloat(networkTxMB.toFixed(2)),
    }
  } catch (error) {
    console.error(
      `Failed to get stats for container ${containerNameOrId}:`,
      error,
    )
    return null
  }
}

/**
 * Get container information (status, uptime, etc.)
 * @param containerNameOrId - Container name or ID
 */
export async function getContainerInfo(
  containerNameOrId: string,
): Promise<ContainerInfo | null> {
  const client = getDockerClient()
  if (!client) return null

  try {
    const container = client.getContainer(containerNameOrId)
    const info = await container.inspect()

    return {
      id: info.Id.substring(0, 12),
      name: info.Name.replace(/^\//, ""),
      status: info.State.Status,
      state: info.State.Running ? "running" : "stopped",
      uptime: info.State.Running
        ? Math.floor(
            (Date.now() - new Date(info.State.StartedAt).getTime()) / 1000,
          )
        : 0,
      image: info.Config.Image,
    }
  } catch (error) {
    console.error(
      `Failed to get info for container ${containerNameOrId}:`,
      error,
    )
    return null
  }
}

/**
 * List all containers (running and stopped)
 */
export async function listContainers(): Promise<ContainerInfo[]> {
  const client = getDockerClient()
  if (!client) return []

  try {
    const containers = await client.listContainers({ all: true })
    return containers.map((c) => ({
      id: c.Id.substring(0, 12),
      name: c.Names[0].replace(/^\//, ""),
      status: c.Status,
      state: c.State,
      uptime: Math.floor((Date.now() - c.Created * 1000) / 1000),
      image: c.Image,
    }))
  } catch (error) {
    console.error("Failed to list containers:", error)
    return []
  }
}

/**
 * Check if Docker is available
 */
export async function isDockerAvailable(): Promise<boolean> {
  const client = getDockerClient()
  if (!client) return false

  try {
    await client.ping()
    return true
  } catch {
    return false
  }
}
