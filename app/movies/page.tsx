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
import SelectedMovies from "@/components/selected-movies"
import { getAllMoviesWithTheaters, theaters } from '@/data/mock'
import { MovieWithTheater } from '@/types/movie'

export default function MoviesPage() {
  const [movies, setMovies] = useState(getAllMoviesWithTheaters())
  const [selectedMovies, setSelectedMovies] = useState<MovieWithTheater[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheater, setSelectedTheater] = useState('all')

  const handleAddMovie = (movie: MovieWithTheater) => {
    setSelectedMovies((prev) => [...prev, movie])
  }

  const handleRemoveMovie = (movieId: string) => {
    setSelectedMovies((prev) => prev.filter((m) => m.id !== movieId))
  }

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTheater = selectedTheater === 'all' || movie.theaterId === selectedTheater
    return matchesSearch && matchesTheater
  })

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">映画を選択</h2>
      <div className="space-y-4 mb-6">
        <Input
          type="search"
          placeholder="映画を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Select value={selectedTheater} onValueChange={setSelectedTheater}>
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
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onAdd={() => handleAddMovie(movie)}
            isSelected={selectedMovies.some((m) => m.id === movie.id)}
          />
        ))}
      </div>

      <SelectedMovies
        movies={selectedMovies}
        onRemove={handleRemoveMovie}
      />
    </div>
  )
}