import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWidgetData } from "@/hooks/use-widget-data"
import { WidgetProps } from "../types"

export function Jellyfin({ widget }: WidgetProps) {
  const { data, isLoading } = useWidgetData<any>({ widget })

  if (isLoading || !data) {
    return <Skeleton className="h-full w-full rounded-4xl corner-squircle" />
  }

  // TODO: Implement Jellyfin widget UI
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jellyfin Widget</CardTitle>
        <CardDescription>Widget ID: {widget.id}</CardDescription>
      </CardHeader>
      <CardContent>Jellyfin widget not implemented yet.</CardContent>
    </Card>
  )
}
