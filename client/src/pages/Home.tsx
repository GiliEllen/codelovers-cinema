import { Box, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/loggedInUser/userAPI'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import MovieCard from '../components/MovieCard'

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([])
  const dispatch = useAppDispatch()

  const getAllMovies = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/api/movies`)
      console.log(data)
      if (data.ok) {
        setMovies(data.message)
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
      {/*Big Image carosel*/}
      <Box>
        <img src="" alt="Image" />
      </Box>
      <Box>
        <Typography variant="h3">Screening Now:</Typography>
        <Box>
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
