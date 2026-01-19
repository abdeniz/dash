import { PlusSquareIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import type { WidgetType } from "@/widgets/definitions.gen"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { queryClient } from "@/routes/__root"
import { createWidget } from "@/server/widgets"
import { useDashboardStore } from "@/stores/dashboard-store"
import { definitions } from "@/widgets/definitions.gen"

export function AddWidgetDialog() {
  const [type, setType] = React.useState<WidgetType>("cpu")
  const open = useDashboardStore((state) => state.addWidgetOpen)
  const setOpen = useDashboardStore((state) => state.setAddWidgetOpen)

  const { mutate } = useMutation({
    mutationKey: ["add-widget"],
    mutationFn: (config: unknown) =>
      createWidget({
        data: {
          typeId: type,
          width: definitions[type].layout.minW,
          height: definitions[type].layout.minH,
          config,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["widgets"] })
      setOpen(false)
    },
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const config: Record<string, string | number> = {}
    formData.forEach((value, key) => {
      const configDef = definitions[type].config as Record<
        string,
        { type: string; label?: string }
      >
      const fieldDef = configDef?.[key]
      if (fieldDef) {
        if (fieldDef.type === "number") {
          config[key] = Number(value)
        } else {
          config[key] = value.toString()
        }
      }
    })

    mutate(config)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            Add widget <Kbd>A</Kbd>
          </Button>
        }
      />
      <DialogContent className="sm:max-w-106.25">
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <DialogHeader>
            <DialogTitle>
              <PlusSquareIcon
                size={20}
                weight="duotone"
                className="text-primary"
              />
              Add widget
            </DialogTitle>
            <DialogDescription>
              Add a new widget to the dashboard
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label>Type</Label>
                <Select
                  defaultValue="cpu"
                  onValueChange={(value) => setType(value as WidgetType)}
                  value={type}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {(value: string) => (
                        <span>{definitions[value as WidgetType].label}</span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(definitions).map((key) => {
                      const def = definitions[key as WidgetType]
                      return (
                        <SelectItem value={def.type} key={def.type}>
                          {def.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                {definitions[type].config &&
                  Object.entries(definitions[type].config).map(
                    ([name, field]) => (
                      <div className="grid gap-1" key={name}>
                        <Label htmlFor={name}>{field.label || name}</Label>
                        <Input
                          id={name}
                          name={name}
                          type={
                            field.secret ? "password" : field.type || "text"
                          }
                          required={field.required}
                        />
                      </div>
                    ),
                  )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
