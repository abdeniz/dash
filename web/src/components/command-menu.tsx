import { PaintRollerIcon, PlusSquareIcon } from "@phosphor-icons/react"
import React from "react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { useTheme } from "@/providers/theme-provider"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandItem>
            <PlusSquareIcon size={20} /> Add widget
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
