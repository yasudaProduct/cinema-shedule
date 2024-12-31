import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin } from 'lucide-react'
import { MovieWithTheater } from "@/types/movie"

interface OptimizedScheduleProps {
  movies: MovieWithTheater[]
}

function calculateTimeDifference(movie1: MovieWithTheater, movie2: MovieWithTheater): number {
  const [hours1, minutes1] = movie1.startTime.split(':').map(Number)
  const [hours2, minutes2] = movie2.startTime.split(':').map(Number)
  const date1 = new Date(2023, 0, 1, hours1, minutes1)
  const date2 = new Date(2023, 0, 1, hours2, minutes2)
  return (date2.getTime() - date1.getTime()) / (1000 * 60) - movie1.duration
}

export default function OptimizedSchedule({ movies }: OptimizedScheduleProps) {
  const sortedMovies = [...movies].sort((a, b) => {
    const [hoursA, minutesA] = a.startTime.split(':').map(Number)
    const [hoursB, minutesB] = b.startTime.split(':').map(Number)
    return hoursA * 60 + minutesA - (hoursB * 60 + minutesB)
  })

  if (sortedMovies.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">最適なスケジュール</CardTitle>
      </CardHeader>
      <CardContent className="relative text-sm">
        <div className="absolute left-[0.875rem] top-0 bottom-0 w-px bg-gray-200" />
        <div className="space-y-4">
          {sortedMovies.map((movie, index) => (
            <div key={movie.id}>
              <div className="relative pl-6">
                <div className="absolute left-0 w-3 h-3 rounded-full bg-indigo-600" />
                <div className="space-y-1">
                  <h3 className="font-medium">{movie.title}</h3>
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
              </div>
              {index < sortedMovies.length - 1 && (
                <div className="relative pl-6 mt-2">
                  <div className="absolute left-0 w-3 h-3 rounded-full bg-gray-200 flex items-center justify-center">
                    <Clock className="w-2 h-2 text-gray-600" />
                  </div>
                  <div className="text-xs text-gray-600">
                    移動時間: {calculateTimeDifference(movie, sortedMovies[index + 1])}分
                    <br />
                    {movie.theater.name}から{sortedMovies[index + 1].theater.name}まで移動
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}