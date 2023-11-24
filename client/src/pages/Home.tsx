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

  // function filterUniqueMovies(data:any) {
  //   const lookup = new Set();

  //   const arr =  data.filter((screen:Screenings) => {
  //     //@ts-ignore
  //      const serialised = screen.movieId._id
  //     if (lookup.has(serialised)) {
  //       return false;
  //     } else {
  //       lookup.add(serialised);
  //       return true;
  //     }
  //   })

  // }

  const handleFilterMoviesByDate = async () => {
    if (startingDate && endingDate) {
      const newStartingDate = new Date(startingDate)
      const newEndingDate = new Date(endingDate)
      console.log(newEndingDate)
      console.log(newStartingDate)
      const { data } = await axios.post(
        `${apiURL}/api/movies/screenings/find/by-date`,
        {
          startDate: newStartingDate,
          endDate: newEndingDate,
        }
      )

      console.log(data)

      if (data.ok && data.message.length > 0) {
        setMoviesToDisplay(
          data.message.map((screening: Screenings) => {
            return {
              //@ts-ignore
              title: screening.movieId.title,
              //@ts-ignore
              description: screening.movieId.description,
              //@ts-ignore
              duration: screening.movieId.duration,
              //@ts-ignore
              _id: screening.movieId._id,
              //@ts-ignore
              image: screening.movieId.image,
              screenings: [screening],
              filtered: true
            }
          })
        )
      } else {
        console.log('somthing went wrong')
      }
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
          <Button onClick={getAllMovies} variant="contained">
            reset
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
              {moviesToDisplay.map((movie, idx) => {
                return <MovieCard key={`${movie._id}-${idx}`} movie={movie} />
              })}
            </>
          ) : null}
        </Box>
      </Box>
    </Fragment>
  )
}
