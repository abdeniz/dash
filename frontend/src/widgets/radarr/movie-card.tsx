import type { Movie } from "./types"
import { Card, CardContent } from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"

type MovieCardProps = {
  movie: Movie
  url: string
}

export function MovieCard({ movie, url }: MovieCardProps) {
  return (
    <CarouselItem
      key={movie.id}
      className="basis-1/2 md:basis-1/4 lg:basis-1/4 relative"
    >
      <a
        href={`${url}/movie/${movie.tmdbId}`}
        target="_blank"
        rel="noreferrer"
        className="group/movie-card"
      >
        <Card className="py-0 rounded-xl! border-2">
          <CardContent className="flex items-center justify-center h-full relative select-none overflow-hidden">
            <img
              alt={movie.title}
              src={
                movie.images.find((img) => img.coverType === "poster")
                  ?.remoteUrl
              }
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full text-center overflow-hidden text-wrap px-1 pb-3 pt-6 leading-tight opacity-0 group-hover/movie-card:opacity-100 font-medium transition-opacity bg-linear-to-b from-transparent to-background">
              {movie.title} ({movie.year})
            </div>
          </CardContent>
        </Card>
      </a>
    </CarouselItem>
  )
}
