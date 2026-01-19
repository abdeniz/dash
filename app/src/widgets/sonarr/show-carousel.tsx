import Autoplay from "embla-carousel-autoplay"
import type { Show } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

type ShowCarouselProps = {
  shows: Array<Show>
  url: string
}

export function ShowCarousel({ shows, url }: ShowCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="max-w-2/3 w-full h-full flex-1 overflow-hidden rounded-lg"
      plugins={[
        Autoplay({
          delay: 8000,
        }),
      ]}
    >
      <CarouselContent>
        {shows.map((show) => (
          <CarouselItem
            key={show.id}
            className="basis-1/2 md:basis-1/4 lg:basis-1/4"
          >
            <a
              href={`${url}/series/${show.titleSlug}`}
              target="_blank"
              rel="noreferrer"
              className="group/show-card"
            >
              <Card className="py-0 rounded-xl! border-2">
                <CardContent className="flex items-center justify-center h-full relative select-none">
                  <img
                    alt={show.title}
                    src={
                      show.images.find((img) => img.coverType === "poster")
                        ?.remoteUrl
                    }
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-center overflow-hidden text-wrap px-1 pb-3 pt-6 leading-tight opacity-0 group-hover/show-card:opacity-100 font-medium transition-opacity bg-linear-to-b from-transparent to-background">
                    {show.title} ({show.year})
                  </div>
                </CardContent>
              </Card>
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
