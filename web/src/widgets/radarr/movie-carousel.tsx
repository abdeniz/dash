import { Movie } from '@/api/radarr/api'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

type MovieCarouselProps = {
  movies: Movie[]
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
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
        {movies.map((movie) => (
          <CarouselItem
            key={movie.id}
            className="basis-1/2 md:basis-1/4 lg:basis-1/4"
          >
            <a
              href={`${import.meta.env.VITE_RADARR_URL}/movie/${movie.tmdbId}`}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <Card className="py-0 rounded-xl">
                <CardContent className="flex aspect-6/9  items-center justify-center h-full relative select-none">
                  <img
                    alt={movie.title}
                    src={
                      movie.images.find((img) => img.coverType === 'poster')
                        ?.remoteUrl
                    }
                    className="absolute top-0 left-0 w-full h-full object-fill"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-center overflow-hidden text-wrap px-1 pb-3 pt-6 leading-tight opacity-0 group-hover:opacity-100 font-medium transition-opacity bg-linear-to-b from-transparent to-background">
                    {movie.title} ({movie.year})
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
