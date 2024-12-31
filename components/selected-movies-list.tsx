import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MovieWithTheater } from "@/types/movie"
import { Clock, MapPin, Check, X } from 'lucide-react'

interface SelectedMoviesListProps {
  movies: MovieWithTheater[]
  toggleMovieInSchedule: (movieId: string) => void
  moviesInSchedule: Set<string>
}

export function SelectedMoviesList({ movies, toggleMovieInSchedule, moviesInSchedule }: SelectedMoviesListProps) {
  if (movies.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">選択した映画</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {movies.map((movie) => {
          const isInSchedule = moviesInSchedule.has(movie.id)
          return (
            <div key={movie.id} className="flex items-center justify-between text-sm">
              <div>
                <div className="font-medium">{movie.title}</div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {movie.startTime} - {movie.duration}分
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {movie.theater.name}
                  </div>
                </div>
              </div>
              <Button
                variant={isInSchedule ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMovieInSchedule(movie.id)}
                className="ml-2"
              >
                {isInSchedule ? (
                  <Check className="w-4 h-4 mr-1" />
                ) : (
                  <X className="w-4 h-4 mr-1" />
                )}
                {isInSchedule ? "対象" : "対象外"}
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}