import * as si from "systeminformation"

export const getCpu = async () => {
  const cpuLoad = await si.currentLoad()

  return {
    avg: cpuLoad.currentLoad,
    cores: cpuLoad.cpus.map((core) => core.load),
  }
}

export const getMemory = async () => {
  const mem = await si.mem()
  return {
    total: mem.total / 1024 / 1024,
    used: mem.active / 1024 / 1024,
    free: mem.available / 1024 / 1024,
    cached: mem.cached / 1024 / 1024,
    usedPercentage: (mem.active / mem.total) * 100,
  }
}

export const getUptime = async () => {
  const time = await si.time()

  return { uptime: time.uptime }
}

export const getStorage = async () => {
  const disks = await si.fsSize()
  return disks.map((d) => ({
    fs: d.fs,
    type: d.type,
    sizeGB: d.size / 1024 / 1024 / 1024,
    usedGB: d.used / 1024 / 1024 / 1024,
    usePercent: d.use,
  }))
}

export const getNetwork = async () => {
  const stats = await si.networkStats()
  const totalRx = stats.reduce((acc, iface) => acc + iface.rx_sec, 0)
  const totalTx = stats.reduce((acc, iface) => acc + iface.tx_sec, 0)

  return {
    rx: totalRx,
    tx: totalTx,
  }
}
