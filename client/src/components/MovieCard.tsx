import React, { FC, useState, useEffect } from 'react'
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Stack,
  Grid,
} from '@mui/material'
import { Movie, Screenings } from '../types/types'
import { useNavigate } from 'react-router-dom'

interface Props {
  movie: Movie
}

const MovieCard: FC<Props> = ({ movie }) => {
  const [datesArr, setDatesArr] = useState<Screenings[]>([])

  const navigate = useNavigate()

function filterUniqueDates(data:any) {
    const lookup = new Set();
    
    const arr =  data.filter((date:Screenings) => {
        let dateToCheck = new Date(date.dateTime)
        dateToCheck.setMinutes(0)
        dateToCheck.setHours(0)
       const serialised = dateToCheck.getTime();
      if (lookup.has(serialised)) {
        return false;
      } else { 
        lookup.add(serialised);
        return true;
      }
    })
    setDatesArr(arr)
  }

  useEffect(() => {
    // findUniqeDates()
    filterUniqueDates(movie.screenings)
    
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

      <Stack spacing={2} alignItems={'center'}>
        <Typography>Showing on:</Typography>
        <Grid container spacing={1} direction={'row'}>
          {datesArr.map((date) => {
            const newDate = new Date(date.dateTime)
            return (
              <Grid item>
                <Chip
                  color="primary"
                  label={`${newDate.getDate()}.${newDate.getMonth() + 1}`}
                />
              </Grid>
            )
          })}
        </Grid>
        <Box>
          <Button onClick={() => navigate(`/movie/${movie._id}`)} sx={{ alignSelf: 'center' }}>Order now</Button>
        </Box>
      </Stack>
    </Paper>
  )
}

export default MovieCard
