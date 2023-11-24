export interface Movie {
  title: string
  description: string
  duration: number
  _id: string,
  image: string,
  screenings: Screenings[],
  filtered? : boolean
}

export interface Screenings {
  _id: string,
  movieId: string | Movie,
  dateTime: Date,
  seats: [{
    id: number, status: string
  }]
}