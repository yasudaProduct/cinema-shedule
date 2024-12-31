'use client'

import { useState } from 'react'
import { Film } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MovieCard from "@/components/movie-card"
import SelectedMovies from "@/components/selected-movies"
import OptimizedSchedule from "@/components/optimized-schedule"
import { getAllMoviesWithTheaters, theaters } from '@/data/mock'
import { MovieWithTheater } from '@/types/movie'

export default function Home() {
  const moviesWithTheaters = getAllMoviesWithTheaters()
  const [selectedMovies, setSelectedMovies] = useState<MovieWithTheater[]>([])

  const handleAddMovie = (movie: MovieWithTheater) => {
    setSelectedMovies((prev) => [...prev, movie])
  }

  const handleRemoveMovie = (movieId: string) => {
    setSelectedMovies((prev) => prev.filter((m) => m.id !== movieId))
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center py-8">
        <Film className="w-12 h-12 mx-auto text-indigo-600 mb-4" />
        <h1 className="text-2xl font-bold mb-2">映画マラソンプランナー</h1>
        <p className="text-gray-600">
          上映中の映画から選んで、最適な映画マラソンプランを作成しましょう
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <Input
          type="search"
          placeholder="映画を検索..."
          className="max-w-xl"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="すべての映画館" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての映画館</SelectItem>
            {theaters.map((theater) => (
              <SelectItem key={theater.id} value={theater.id}>
                {theater.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {moviesWithTheaters.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAdd={() => handleAddMovie(movie)}
            isSelected={selectedMovies.some((m) => m.id === movie.id)}
          />
        ))}
      </div>

      <div className="space-y-8">
        <SelectedMovies
          movies={selectedMovies}
          onRemove={handleRemoveMovie}
        />
        <OptimizedSchedule movies={selectedMovies} />
      </div>
    </div>
  )
}