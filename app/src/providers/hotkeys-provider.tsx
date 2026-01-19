import { useHotkeys } from "react-hotkeys-hook"
import { useTheme } from "./theme-provider"
import { useDashboardStore } from "@/stores/dashboard-store"

export function HotkeysProvider() {
  const toggleEditable = useDashboardStore((s) => s.toggleEditable)
  const editable = useDashboardStore((s) => s.editable)
  const setAddWidget = useDashboardStore((s) => s.setAddWidgetOpen)

  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  useHotkeys("e", toggleEditable, { enableOnFormTags: false })
  useHotkeys("t", toggleTheme, { enableOnFormTags: false })
  useHotkeys("a", () => editable && setAddWidget(true), {
    enableOnFormTags: false,
  })

  return null
}
