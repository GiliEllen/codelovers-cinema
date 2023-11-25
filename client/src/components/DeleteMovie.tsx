import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import { Movie } from '../types/types'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'

const DeleteMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [movieIdx, setMovieIdx] = useState<number>()
  const [chosenMovie, setChosenMovie] = useState<Movie>()

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
    getAllMovies()
  }, [])

  const handleDeleteMovie = async () => {
    try {
      const { data } = await axios.delete(
        `${apiURL}/api/movies/${chosenMovie?._id}`
      )
      if (data.ok) {
        console.log(data)
        setMovies(movies.filter((movie) => movie._id != chosenMovie?._id))
        setChosenMovie(undefined)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
      <>
        <Typography>Choose a movie:</Typography>
        {movies.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              width: '85vw',
              overflowX: 'scroll',
            }}
          >
            {movies.map((movie, idx) => {
              return (
                <Paper
                  sx={{
                    backgroundColor: idx == movieIdx ? '#cecece' : 'white',
                    minWidth: '300px',
                  }}
                  onClick={() => {
                    setMovieIdx(idx)
                    setChosenMovie(movie)
                  }}
                >
                  <Stack padding={2}>
                    <img src={movie.image} alt={movie.title} />
                    <Typography>{movie.title}</Typography>
                  </Stack>
                </Paper>
              )
            })}
          </Box>
        ) : null}
      </>
      <Dialog open={chosenMovie?.title ? true : false}>
        <DialogTitle>Are You Sure You Want To Delete This Movie?</DialogTitle>
        <DialogContent>
          This action will remove the movie and all of its screenings, and is
          irreversable.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteMovie}>delete</Button>
          <Button
            onClick={() => {
              setChosenMovie(undefined)
              setMovieIdx(undefined)
            }}
          >
            cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DeleteMovie
