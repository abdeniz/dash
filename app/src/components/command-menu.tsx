import { PaintRollerIcon, PenIcon, PlusSquareIcon } from "@phosphor-icons/react"
import React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { useTheme } from "@/providers/theme-provider"
import { useDashboardStore } from "@/stores/dashboard-store"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const toggleEditable = useDashboardStore((state) => state.toggleEditable)
  const setAddWidgetOpen = useDashboardStore((state) => state.setAddWidgetOpen)

  useHotkeys(
    "meta+k,ctrl+k",
    (e) => {
      e.preventDefault()
      setOpen((open) => !open)
    },
    [setOpen],
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandItem
            onSelect={() => {
              setOpen(false)
              setAddWidgetOpen(true)
            }}
          >
            <PlusSquareIcon size={20} /> Add widget
          </CommandItem>
          <CommandItem
            onSelect={() => {
              toggleEditable()
              setOpen(false)
            }}
          >
            <PenIcon size={20} /> Toggle edit
          </CommandItem>
          <CommandItem
            onSelect={() =>
              setTheme(
                theme === "dark" || theme === "system" ? "light" : "dark",
              )
            }
          >
            <PaintRollerIcon size={20} /> Toggle theme
          </CommandItem>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
