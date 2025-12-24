import { create } from "zustand"
import type { LayoutItem } from "react-grid-layout"

type DashboardState = {
  editable: boolean
  toggleEditable: () => void
  layout: Array<LayoutItem>
  originalLayout: Array<LayoutItem> | null

  setLayout: (newLayout: Array<LayoutItem>) => void

  isDirty: () => boolean

  addWidgetOpen: boolean
  setAddWidgetOpen: (open: boolean) => void

  reset: () => void
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  editable: false,
  toggleEditable: () =>
    set((state) => ({
      editable: !state.editable,
    })),

  layout: [],
  originalLayout: null,

  setLayout: (newLayout: Array<LayoutItem>) => {
    set((state) => ({
      originalLayout:
        state.originalLayout === null ? newLayout : state.originalLayout,
      layout: newLayout,
    }))
  },

  isDirty: () => {
    const originalLayout = useDashboardStore.getState().originalLayout
    const currentLayout = get().layout

    if (originalLayout?.length !== currentLayout.length) return true

    for (let i = 0; i < originalLayout.length; i++) {
      const defItem = originalLayout[i]
      const curItem = currentLayout.find((item) => item.i === defItem.i)
      if (!curItem) return true
      if (
        defItem.x !== curItem.x ||
        defItem.y !== curItem.y ||
        defItem.w !== curItem.w ||
        defItem.h !== curItem.h
      ) {
        return true
      }
    }

    return false
  },

  reset: () => {
    const originalLayout = get().originalLayout
    if (originalLayout) {
      set({
        layout: originalLayout,
        originalLayout: null,
      })
    }
  },

  addWidgetOpen: false,
  setAddWidgetOpen: (open: boolean) => set({ addWidgetOpen: open }),
}))
