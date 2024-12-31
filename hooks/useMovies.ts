import { useState, useEffect } from 'react'
import { MovieWithTheater } from '@/types/movie'

export function useMovies() {
  const [movies, setMovies] = useState<MovieWithTheater[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies')
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data = await response.json()
        setMovies(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return { movies, loading, error }
}