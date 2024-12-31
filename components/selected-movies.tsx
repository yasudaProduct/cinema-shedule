import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from 'lucide-react'
import { MovieWithTheater } from "@/types/movie"

interface SelectedMoviesProps {
  movies: MovieWithTheater[]
  onRemove: (movieId: string) => void
}

export default function SelectedMovies({ movies, onRemove }: SelectedMoviesProps) {
  if (movies.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>選択した映画</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{movie.title}</div>
              <div className="text-sm text-gray-600">{movie.theater.name} - {movie.startTime}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(movie.id)}>
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

