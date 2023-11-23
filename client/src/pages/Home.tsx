import { Box, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/loggedInUser/userAPI'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import MovieCard from '../components/MovieCard'
import HoverCarousel from 'hover-carousel'
import { Movie } from '../types/types'

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([])
  const [moviesPosters, setMoviesPosters] = useState<any[]>([])
  const dispatch = useAppDispatch()
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']

  const getAllMovies = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/api/movies`)
      console.log(data)
      if (data.ok) {
        setMovies(data.message)
        setMoviesPosters(
          data.message.map((movie: Movie) => {
            return movie.image
          })
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    dispatch(login())
  }, [])

  useEffect(() => {
    getAllMovies()
  }, [])

  return (
    <Fragment>
      <HoverCarousel images={moviesPosters} />
      <Box>
        <Typography variant="h3">Screening Now:</Typography>

        <Box sx={{display: "flex", gap: 3, flexWrap: "wrap"}}>
          {movies.length > 0 ? (
            <>
              {movies.map((movie) => {
                return <MovieCard key={movie._id} movie={movie} />
              })}
            </>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}
