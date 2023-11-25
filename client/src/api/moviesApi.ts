import axios from 'axios'
import { apiURL } from './apiUrl'
import { Movie } from '../types/types'

export const getAllMovies = async () => {
  try {
    const { data } = await axios.get(`${apiURL}/api/movies`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const handleAddMovie = async (movie: Movie, image: string) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/api/movies`,
      { movie, image },
      { withCredentials: true }
    )

    return data
  } catch (error) {
    console.error(error)
  }
}

export const handleDeleteMovie = async (movie: Movie) => {
  try {
    const { data } = await axios.delete(`${apiURL}/api/movies/${movie?._id}`)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const handleUpdateMovie = async (movie: Movie) => {
  try {
    const { data } = await axios.patch(`${apiURL}/api/movies/${movie._id}`, {
      movie,
    })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const handleFindMoviesByDate = async (
  startDate: Date,
  endDate: Date
) => {
  const { data } = await axios.post(
    `${apiURL}/api/movies/screenings/find/by-date`,
    {
      startDate,
      endDate,
    }
  )
  return data
}

export const handleAddScreenings = async (
  movie: Movie,
  times: any[],
  movieId?: string
) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/api/movies/${movieId ? movieId : movie._id}`,
      {
        times,
      }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const handleDeleteScreening = async (id: string) => {
  try {
    const { data } = await axios.delete(`${apiURL}/api/movies/screenings/${id}`)

    if (data.ok) {
      console.log(data)
    }
  } catch (error) {
    console.error(error)
  }
}
