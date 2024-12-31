import { Theater, Movie, MovieWithTheater } from '@/types/movie'

export const theaters: Theater[] = [
  {
    id: 'toho-shinjuku',
    name: 'TOHOシネマズ 新宿',
    location: '東京都新宿区歌舞伎町1-19-1',
  },
  {
    id: 'cinema-city',
    name: 'シネマシティ',
    location: '東京都新宿区新宿3-13-3',
  },
  {
    id: 'piccadilly',
    name: 'ピカデリー',
    location: '東京都新宿区新宿3-15-15',
  },
]

export const movies: Movie[] = [
  {
    id: 'godzilla-kong',
    title: 'ゴジラ×コング 新たなる帝国',
    theaterId: 'toho-shinjuku',
    startTime: '10:00',
    duration: 115,
    image: '/placeholder.svg',
  },
  {
    id: 'dune-2',
    title: 'デューン 砂の惑星 PART2',
    theaterId: 'cinema-city',
    startTime: '14:30',
    duration: 166,
    image: '/placeholder.svg',
  },
  {
    id: 'kingdom',
    title: 'キングダム 運命の炎',
    theaterId: 'piccadilly',
    startTime: '13:00',
    duration: 134,
    image: '/placeholder.svg',
  },
]

export function getMovieWithTheater(movie: Movie): MovieWithTheater {
  const theater = theaters.find(t => t.id === movie.theaterId)
  if (!theater) throw new Error(`Theater not found for movie: ${movie.id}`)
  return { ...movie, theater }
}

export function getAllMoviesWithTheaters(): MovieWithTheater[] {
  return movies.map(getMovieWithTheater)
}

