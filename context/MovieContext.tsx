'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { MovieWithTheater } from '@/types/movie'

interface MovieContextType {
  selectedMovies: MovieWithTheater[]
  addMovie: (movie: MovieWithTheater) => void
  removeMovie: (movieId: string) => void
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export function MovieProvider({ children }: { children: ReactNode }) {
  const [selectedMovies, setSelectedMovies] = useState<MovieWithTheater[]>([])

  const addMovie = (movie: MovieWithTheater) => {
    setSelectedMovies((prev) => [...prev, movie])
  }

  const removeMovie = (movieId: string) => {
    setSelectedMovies((prev) => prev.filter((m) => m.id !== movieId))
  }

  return (
    <MovieContext.Provider value={{ selectedMovies, addMovie, removeMovie }}>
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