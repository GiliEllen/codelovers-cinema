import { Box, Typography, Button, Paper } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/loggedInUser/userAPI'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import MovieCard from '../components/MovieCard'
// import HoverCarousel from 'hover-carousel'
import { Movie, Screenings } from '../types/types'

export const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([])
  const [moviesToDisplay, setMoviesToDisplay] = useState<any[]>(movies)
  const [moviesPosters, setMoviesPosters] = useState<any[]>([])

  const [startingDate, setStartingDate] = useState<string>()
  const [endingDate, setEndingDate] = useState<string>()

  const dispatch = useAppDispatch()

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

  const handleFilterMoviesByDate = () => {
    if (startingDate && endingDate) {
      const newStartingDate = new Date(startingDate)
      const newEndingDate = new Date(endingDate)

      setMoviesToDisplay(
        movies.map((movie) => {
          const arr = movie.screenings.filter((screening: Screenings) => {
            if (
              new Date(screening.dateTime).getTime() >=
                newStartingDate.getTime() &&
              new Date(screening.dateTime).getTime() <= newEndingDate.getTime()
            ) {
              return true
            } else {
              return false
            }
          })
          console.log(arr)
          if (arr.length > 0) {
            return { ...movie, screenings: arr }
          } 
        })
      )
    }
  }

  useEffect(() => {
    dispatch(login())
  }, [])

  useEffect(() => {
    getAllMovies()
  }, [])

  useEffect(() => {
    setMoviesToDisplay(movies)
  }, [movies])

  return (
    <Fragment>
      {/* {moviesPosters.length > 0 ? <HoverCarousel imas={moviesPosters} /> : null} */}
      <Paper>
        <Typography variant="h6">By Date:</Typography>
        <form>
          <label>starting date</label>
          <input
            type="date"
            value={startingDate}
            onChange={(ev) => {
              setStartingDate(ev.target.value)
            }}
          />
          <label>until date:</label>
          <input
            type="date"
            value={endingDate}
            onChange={(ev) => {
              setEndingDate(ev.target.value)
            }}
          ></input>
          <Button onClick={handleFilterMoviesByDate} variant="contained">
            Find
          </Button>
        </form>
      </Paper>
      <Box>
        <Typography variant="h3">Screening Now:</Typography>

        <Box
          sx={{ display: 'flex', gap: 3, width: '90vw', overflowX: 'scroll' }}
        >
          {moviesToDisplay.length > 0 ? (
            <>
              {moviesToDisplay.map((movie) => {
                return <MovieCard key={movie._id} movie={movie} />
              })}
            </>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}
