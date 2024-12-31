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
import { useMovieContext } from '@/context/MovieContext'
import { useMovies } from '@/hooks/useMovies'
import { theaters } from '@/data/mock'

export default function MoviesPage() {
  const { movies, loading, error } = useMovies()
  const { selectedMovies, addMovie, removeMovie } = useMovieContext()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTheater, setSelectedTheater] = useState('all')

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
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
            onAdd={() => addMovie(movie)}
            isSelected={selectedMovies.some((m) => m.id === movie.id)}
          />
        ))}
      </div>

      <SelectedMovies
        movies={selectedMovies}
        onRemove={removeMovie}
      />
    </div>
  )
}