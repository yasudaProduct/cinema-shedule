export interface Theater {
    id: string
    name: string
    location: string
  }
  
  export interface Movie {
    id: string
    title: string
    theaterId: string
    startTime: string
    duration: number
    image: string
  }
  
  export interface MovieWithTheater extends Movie {
    theater: Theater
  }
  
  