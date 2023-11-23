export interface Movie {
  title: string
  description: string
  duartion: number
  _id: string,
  image: string,
  screenings: Screenings[]
}

export interface Screenings {
  movieId: string,
  dateTime: Date,
  seats: [{
    id: number, status: string
  }]
}