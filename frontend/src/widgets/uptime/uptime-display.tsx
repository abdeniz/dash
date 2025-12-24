import { cn } from "@/lib/utils"

type UptimeDisplayProps = {
  value: number
  children: React.ReactNode
  isPrimary?: boolean
}

export function UptimeDisplay({
  value,
  children,
  isPrimary,
}: UptimeDisplayProps) {
  return (
    <div className="flex items-end-safe gap-0.5">
      <p
        className={cn(
          "font-normal text-2xl tracking-tightest",
          isPrimary ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </p>
      <p className="text-muted-foreground text-xl font-normal">{children}</p>
    </div>
  )
}
