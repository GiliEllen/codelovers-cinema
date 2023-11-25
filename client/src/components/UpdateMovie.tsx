import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Chip,
  Grid,
} from '@mui/material'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import MovieCard from './MovieCard'
import { Movie, Screenings } from '../types/types'
import moment from 'moment'
import AddScreenings from './AddScreenings'
import { useNavigate } from 'react-router-dom'

const UpdateMovie = () => {
  const [movies, setMovies] = useState<any[]>([])
  const [movieIdx, setMovieIdx] = useState<number>()
  const [chosenMovie, setChosenMovie] = useState<Movie>({
    title: '',
    duration: 0,
    description: '',
    _id: '',
    image: '',
    screenings: [],
  })

  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const navigate = useNavigate()

  const steps = [
    'Choose a movie from list',
    'Update Movie Information',
    'Update or Delete Screenings',
  ]

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

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleUpdateMovie = async () => {
    try {
      const { data } = await axios.patch(
        `${apiURL}/api/movies/${chosenMovie._id}`,
        {
          movie: chosenMovie,
        }
      )

      if (data.ok) {
        navigate("/")
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleDeleteScreening = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `${apiURL}/api/movies/screenings/${id}`
      )

      if (data.ok) {
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box>
            {activeStep + 1 === 1 ? (
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
                            backgroundColor:
                              idx == movieIdx ? '#cecece' : 'white',
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
            ) : null}
            {activeStep + 1 === 2 ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography>Change Information</Typography>
                <Stack width={'50%'} gap={3}>
                  <TextField
                    label="Title"
                    value={chosenMovie ? chosenMovie.title : ''}
                    onInput={(ev) => {
                      //@ts-ignore
                      setChosenMovie({ ...chosenMovie, title: ev.target.value })
                    }}
                    required
                  />
                  <TextField
                    label="Description"
                    value={chosenMovie ? chosenMovie.description : ''}
                    onInput={(ev) => {
                      setChosenMovie({
                        ...chosenMovie,
                        //@ts-ignore
                        description: ev.target.value,
                      })
                    }}
                    required
                  />
                  <TextField
                    label="duration"
                    type="number"
                    value={chosenMovie ? chosenMovie.duration : 0}
                    onInput={(ev) => {
                      setChosenMovie({
                        ...chosenMovie,
                        //@ts-ignore
                        duration: ev.target.value,
                      })
                    }}
                    required
                  />
                </Stack>
              </Box>
            ) : null}
            {activeStep + 1 === 3 ? (
              <>
                <Typography variant="h6">
                  Update or Delete Screenings
                </Typography>
                <Typography>Delete Screenings</Typography>

                <Grid container gap={5}>
                  {chosenMovie.screenings?.map((screen, idx) => {
                    const newDate = new Date(screen.dateTime)

                    return (
                      <Grid item>
                        <Chip
                          id={`${screen._id}`}
                          key={`${screen._id}`}
                          onDelete={() => {
                            handleDeleteScreening(screen._id)
                            setChosenMovie({
                              ...chosenMovie,
                              screenings: chosenMovie.screenings?.filter(
                                (screeningToScan) =>
                                  screeningToScan._id != screen._id
                              ),
                            })
                          }}
                          label={`${moment(newDate).format('L LT')}`}
                        />
                      </Grid>
                    )
                  })}
                </Grid>

                <Typography>Add Screenings</Typography>
                <AddScreenings
                  movie={chosenMovie}
                />
              </>
            ) : null}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            {activeStep === 0 ? (
              <Button
                onClick={handleNext}
                disabled={chosenMovie && chosenMovie.title ? false : true}
              >
                Next
              </Button>
            ) : null}
            {activeStep === 1 ? (
              <Button
                onClick={() => {
                  handleNext()
                }}
              >
                Next
              </Button>
            ) : null}
            {activeStep === 2 ? (
              <Button
                onClick={() => {
                  handleUpdateMovie()
                }}
              >
                Finish
              </Button>
            ) : null}
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}

export default UpdateMovie
