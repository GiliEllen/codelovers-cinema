import React, { FC, useState } from 'react'
import { Movie } from '../types/types'

import {
  Typography,
  Button,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import Instructions from './Instructions'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import moment from 'moment'
import useToast from '../hooks/useToast'
import Toast from './Toast'
import { handleAddScreenings } from '../api/moviesApi'

interface Props {
  movie: Movie
  movieId?: string
}

const AddScreenings: FC<Props> = ({ movie, movieId }) => {
  const [screeningDate, setScreeningDate] = useState<string>()
  const [time, setTime] = useState<string>()
  const [times, setTimes] = useState<any[]>([])
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [notAllowedDates, setNotAllowedDates] = useState<Date[]>([])

  const { open, setOpen, msg, setMsg, toastStatus, setToastStatus } = useToast()
  const handleClose = () => {
    setShowDialog(false)
  }

  // const handleAddScreenings = async (
  //   ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   const { data } = await axios.post(
  //     `${apiURL}/api/movies/${movieId ? movieId : movie._id}`,
  //     {
  //       times,
  //     }
  //   )
  //   if (data.ok) {
  //     console.log('successfully added screening')
  //     setScreeningDate('')
  //     setTime('')
  //     setTimes([])
  //     if (data.message.notAllowedDates.length > 0) {
  //       console.log(data.message.notAllowedDates)
  //     }
  //   }
  // }

  const handleSubmit = async () => {
    try {
      const data = await handleAddScreenings(movie, times, movieId)
      if (!data.ok) {
        console.log(data)
      }
      if (data.ok) {
        console.log('successfully added screening')
        setScreeningDate('')
        setTime('')
        setTimes([])
        if (data.message.added.length > 0) {
          setMsg('Successfully added screenings!')
          setToastStatus('success')
          setOpen(true)
        }
        if (data.message.notAllowedDates.length > 0) {
          setNotAllowedDates(data.message.notAllowedDates)
          setShowDialog(true)
        }
      }
    } catch (error) {
      console.log(error)
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
                  sx={{ padding: 1 }}
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
                  {`${moment(timeBox).format('HH[:]mm')}`}
                </Paper>
              )
            })}
          </Box>
          <Button variant="contained" onClick={handleSubmit}>
            Add Screenings
          </Button>
        </Box>
      ) : null}
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Failed to schedule some of the screenings.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It seems that you tried to schedule a screening within 3 hours of an
            existing one. This is the times that were failed to be scheduled:
          </DialogContentText>
          <ul>
            {notAllowedDates.map((date) => {
              return <li>{moment(date).format('lll')}</li>
            })}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            I understand
          </Button>
        </DialogActions>
      </Dialog>
      <Toast
        msg={msg}
        status={toastStatus ? toastStatus : 'info'}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default AddScreenings
