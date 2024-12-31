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
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">選択した映画</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">まだ映画が選択されていません。</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">選択した映画</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {movies.map((movie) => (
          <div key={movie.id} className="flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">{movie.title}</div>
              <div className="text-xs text-gray-600">{movie.theater.name} - {movie.startTime}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onRemove(movie.id)}>
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

