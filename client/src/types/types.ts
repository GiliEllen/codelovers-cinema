export interface Movie {
  title: string
  description: string
  duration: number
  _id: string,
  image: string,
  screenings: Screenings[]
}

export interface Screenings {
  _id: string,
  movieId: string,
  dateTime: Date,
  seats: [{
    id: number, status: string
  }]
}