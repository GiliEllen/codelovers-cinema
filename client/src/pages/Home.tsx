import { Box, Typography, Button, Paper, InputLabel } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/loggedInUser/userAPI'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import MovieCard from '../components/MovieCard'
// import HoverCarousel from 'hover-carousel'
import { Movie, Screenings } from '../types/types'
import Toast from '../components/Toast'
import { AlertColor } from '@mui/material/Alert'
import useToast from '../hooks/useToast'
import { Carousel } from '../components/Carousel/Carousel'
import { getAllMovies } from '../api/moviesApi'


export const Home: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([])
  const [moviesToDisplay, setMoviesToDisplay] = useState<any[]>(movies)
  const [moviesPosters, setMoviesPosters] = useState<any[]>([])

  const [startingDate, setStartingDate] = useState<string>()
  const [endingDate, setEndingDate] = useState<string>()

  //Toast related
  const { open, setOpen, msg, setMsg, toastStatus, setToastStatus } = useToast()

  const dispatch = useAppDispatch()

  const getMovies = async () => {
    try {
      const data = await getAllMovies()
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
      setMsg("Somthing Went Wrong. Please try again later.")
      setToastStatus('error')
      setOpen(true)
    }
  }

  const handleFilterMoviesByDate = async () => {
    if (startingDate && endingDate) {
      const newStartingDate = new Date(startingDate)
      const newEndingDate = new Date(endingDate)
      const { data } = await axios.post(
        `${apiURL}/api/movies/screenings/find/by-date`,
        {
          startDate: newStartingDate,
          endDate: newEndingDate,
        }
      )

      if (data.ok && data.message.length > 0) {
        console.log(data.message)
        setMoviesToDisplay(
          data.message.map((screening: Screenings) => {
            if (typeof screening.movieId != 'string') {
              return {
                title: screening.movieId.title,
                description: screening.movieId.description,
                duration: screening.movieId.duration,
                _id: screening.movieId._id,
                image: screening.movieId.image,
                screenings: [screening],
                filtered: true,
              }
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
    getMovies()
  }, [])

  useEffect(() => {
    setMoviesToDisplay(movies)
  }, [movies])

  return (
    <Fragment>
      <Carousel images={moviesPosters}/>
      {/* {moviesPosters.length > 0 ? <HoverCarousel imas={moviesPosters} /> : null} */}
      <Paper sx={{ padding: 3, marginTop: 36 }}>
        <Typography variant="h6">By Date:</Typography>
        <form style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Box sx={{width: "15rem", display: "flex", justifyContent: "space-between"}}>
            <Box>
              <InputLabel>starting date</InputLabel>
              <input
                type="date"
                value={startingDate}
                onChange={(ev) => {
                  setStartingDate(ev.target.value)
                }}
              />
            </Box>
            <Box>
              <InputLabel>until date:</InputLabel>
              <input
                type="date"
                value={endingDate}
                onChange={(ev) => {
                  setEndingDate(ev.target.value)
                }}
              />
            </Box>
          </Box>
          <Box sx={{width: "10rem", display: "flex", justifyContent: "space-between"}}>
            <Button onClick={handleFilterMoviesByDate} variant="contained">
              Find
            </Button>
            <Button onClick={getMovies} variant="contained">
              reset
            </Button>
          </Box>
        </form>
      </Paper>
      <Box width={"90vw"} >
        <Typography variant="h3">Screening Now:</Typography>

        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}
        >
          {moviesToDisplay.length > 0 ? (
            <>
              {moviesToDisplay.map((movie, idx) => {
                return <MovieCard key={`${movie._id}-${movie.screenings[0]._id}-${movie.filtered ? "F" : "N"}`} movie={movie} />
              })}
            </>
          ) : null}
        </Box>
      </Box>
      <Toast
        msg={msg}
        status={toastStatus ? toastStatus : 'info'}
        open={open}
        setOpen={setOpen}
      />
    </Fragment>
  )
}
