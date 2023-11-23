import React, { FC, useState, useEffect } from 'react'
import { Box, Paper, Typography, Chip } from '@mui/material'
import { Movie } from '../types/types'

interface Props {
  movie: Movie
}

const MovieCard: FC<Props> = ({ movie }) => {
  const [datesArr, setDatesArr] = useState<Date[]>([])

  let findUniqeDates = () => {
    let unique_values = [
      ...new Set(movie.screenings.map((element) => element.date.toString())),
    ]
    const arr = unique_values.map((value) => {
      return new Date(value)
    })
    setDatesArr(arr)
  }

  useEffect(() => {
    findUniqeDates()
  }, [])
  return (
    <Paper
      elevation={3}
      sx={{
        width: '15rem',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <img
          width={'100%'}
          height={'350px'}
          src={movie.image}
          alt={`${movie.title} poster`}
        />
        <Typography variant="h6">{movie.title}</Typography>
      </Box>

      <Box>
        <Typography>Showing on:</Typography>
        <Box>
          {datesArr.map((date) => {
            return (
              <Chip
                color="primary"
                label={`${date.getDate()}.${date.getMonth() + 1}`}
              />
            )
          })}
        </Box>
      </Box>
    </Paper>
  )
}

export default MovieCard
