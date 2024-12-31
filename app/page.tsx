'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MovieCard from "@/components/movie-card"
import { getAllMoviesWithTheaters, theaters } from '@/data/mock'
import { MovieWithTheater } from '@/types/movie'

export default function Home() {
  const moviesWithTheaters = getAllMoviesWithTheaters()
  const [selectedMovies, setSelectedMovies] = useState<MovieWithTheater[]>([])

  const handleAddMovie = (movie: MovieWithTheater) => {
    setSelectedMovies((prev) => [...prev, movie])
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="space-y-4 mb-6">
        <Input
          type="search"
          placeholder="映画を検索..."
          className="w-full"
        />
        <Select>
          <SelectTrigger className="w-full">
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

      <div className="space-y-4 mb-6">
        {moviesWithTheaters.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAdd={() => handleAddMovie(movie)}
            isSelected={selectedMovies.some((m) => m.id === movie.id)}
          />
        ))}
      </div>
    </div>
  )
}