import Autoplay from "embla-carousel-autoplay"
import { MovieCard } from "./movie-card"
import type { Movie } from "./types"
import { Carousel, CarouselContent } from "@/components/ui/carousel"

type MovieCarouselProps = {
  movies: Array<Movie>
  url: string
}

export function MovieCarousel({ movies, url }: MovieCarouselProps) {
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
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} url={url} />
        ))}
      </CarouselContent>
    </Carousel>
  )
}
