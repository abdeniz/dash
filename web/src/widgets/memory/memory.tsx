import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemory } from "./use-memory";
import { megabytesToGigabytes } from "@/lib/utils";

export function Memory() {
  const { total, used, usedPercentage, isLoading } = useMemory();

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-4xl corner-squircle" />;
  }

  return (
    <Card>
      <CardContent className="h-full relative">
        <div className="flex w-full items-center justify-between gap-4 mb-1">
          <div className="flex flex-col justify-center w-full">
            <div className="flex justify-between w-full">
              <div className="flex items-end-safe gap-0">
                <p className="font-normal text-2xl tracking-tightest text-primary">
                  {usedPercentage?.toFixed(0) ?? 0}
                </p>
                <p className="text-muted-foreground text-xl font-normal">%</p>
              </div>

              <div className="flex items-end-safe">
                <p className="font-normal text-2xl tracking-tightest text-primary">
                  {megabytesToGigabytes(used ?? 0).toFixed(1)}
                </p>
                <p className="text-muted-foreground text-2xl font-normal px-0.5">
                  /
                </p>
                <p className="font-normal text-2xl tracking-tightest">
                  {megabytesToGigabytes(total ?? 0).toFixed(1)}
                </p>
                <p className="text-muted-foreground text-xl font-normal pl-0.5">
                  GB
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-base uppercase tracking-wider">
              Memory
            </p>
          </div>
        </div>
        <Progress
          className="absolute -bottom-2 left-0 w-full"
          value={usedPercentage ?? 0}
        />
      </CardContent>
    </Card>
  );
}
