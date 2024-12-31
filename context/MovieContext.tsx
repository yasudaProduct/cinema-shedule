'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MovieWithTheater } from '@/types/movie'
import { useMovies } from '@/hooks/useMovies'

interface MovieContextType {
  movies: MovieWithTheater[]
  selectedMovies: MovieWithTheater[]
  addMovie: (movie: MovieWithTheater) => void
  removeMovie: (movieId: string) => void
  loading: boolean
  error: Error | null
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export function MovieProvider({ children }: { children: ReactNode }) {
  const { movies, loading, error } = useMovies()
  const [selectedMovies, setSelectedMovies] = useState<MovieWithTheater[]>([])

  const addMovie = (movie: MovieWithTheater) => {
    setSelectedMovies((prev) => [...prev, movie])
  }

  const removeMovie = (movieId: string) => {
    setSelectedMovies((prev) => prev.filter((m) => m.id !== movieId))
  }

  return (
    <MovieContext.Provider value={{ movies, selectedMovies, addMovie, removeMovie, loading, error }}>
      {children}
    </MovieContext.Provider>
  )
}

export function useMovieContext() {
  const context = useContext(MovieContext)
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider')
  }
  return context
}