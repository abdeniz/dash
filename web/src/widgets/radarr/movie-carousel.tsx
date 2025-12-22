import { Movie } from '@/api/radarr/api'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { MovieCard } from './movie-card'

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
          <MovieCard movie={movie} />
        ))}
      </CarouselContent>
    </Carousel>
  )
}
