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

export const handleDeleteMovie = async (movie: Movie) => {
  try {
    const { data } = await axios.delete(`${apiURL}/api/movies/${movie?._id}`)
    return data
  } catch (error) {
    console.error(error)
  }
}
