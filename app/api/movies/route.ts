import { NextResponse } from 'next/server'
import { movies, theaters } from '@/data/mock'
import { MovieWithTheater } from '@/types/movie'

export async function GET() {
  // モックデータを使用してMovieWithTheaterオブジェクトを作成
  const moviesWithTheaters: MovieWithTheater[] = movies.map(movie => {
    const theater = theaters.find(t => t.id === movie.theaterId)
    if (!theater) {
      throw new Error(`Theater not found for movie: ${movie.id}`)
    }
    return { ...movie, theater }
  })

  // APIレスポンスを返す
  return NextResponse.json(moviesWithTheaters)
}

