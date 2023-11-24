import React, { FC, useState } from 'react'
import { Movie } from '../types/types'

import { Typography, Button, Box, Paper } from '@mui/material'
import Instructions from './Instructions'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'

interface Props {
  movie: Movie
  movieId? : string
}

const AddScreenings: FC<Props> = ({ movie, movieId }) => {
  const [screeningDate, setScreeningDate] = useState<string>()
  const [time, setTime] = useState<string>()
  const [times, setTimes] = useState<any[]>([])

  const handleAddScreenings = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { data } = await axios.post(`${apiURL}/api/movies/${movieId ? movieId : movie._id}`, {
      times,
    })
    if (data.ok) {
      console.log('successfully added screening')
      setScreeningDate('')
      setTime('')
      setTimes([])
    }
  }

  return (
    <>
      <Instructions />
      <Box>
        <Typography>Choose a Date:</Typography>
        <input
          type="date"
          value={screeningDate}
          onChange={(ev) => {
            setScreeningDate(ev.target.value)
          }}
        />
      </Box>

      {screeningDate ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Typography>Choose Times:</Typography>
          <input
            type="time"
            id=""
            value={time}
            onChange={(ev) => setTime(ev.target.value)}
          />
          <Button
            onClick={(ev: any) => {
              const newDate = new Date(screeningDate)
              if (time) {
                console.log(time)
                const hour = Number(time.substring(0, 2))
                const minutes = Number(time.substring(3, 5))
                newDate.setHours(hour)
                newDate.setMinutes(minutes)
                setTimes([...times, newDate])
                console.log(times)
              }

              //   if (time) handleFilterTimeArray(time)
            }}
            variant="contained"
          >
            ADD
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {times.map((timeBox, idx) => {
              return (
                <Paper
                  onClick={(ev) => {
                    setTimes(
                      times.filter((screenTime, index) => {
                        //@ts-ignore
                        return index != ev.target.id
                      })
                    )
                  }}
                  key={`${screeningDate}-${timeBox}`}
                  id={`${idx}`}
                >
                  {`${timeBox.getHours()}:${timeBox.getMinutes()}`}
                </Paper>
              )
            })}
          </Box>
          <Button variant="contained" onClick={handleAddScreenings}>
            Add Screenings
          </Button>
        </Box>
      ) : null}
    </>
  )
}

export default AddScreenings
