import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { apiURL } from '../api/apiUrl'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { Movie } from '../types/types'
import ChairIcon from '@mui/icons-material/Chair'
import { useAppSelector } from '../app/hooks'
import { userSelector } from '../features/loggedInUser/loggedInUser'

const OrderMovie = () => {
  const [movie, setMovie] = useState<Movie>()
  const [screeningToOrderId, setScreeningToOrderId] = useState<string>()
  const [screeningToShow, setScreeningToshow] = useState<any>()
  const [seatId, setSeatId] = useState<number>(0)
  const [displaySit, setDisplaySit] = useState({ row: 0, sit: 0 })
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState<string>('')
  const { movieId } = useParams()
  const user = useAppSelector(userSelector)

  const handleGetMovie = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/api/movies/${movieId}`)
      if (data.ok) {
        setMovie(data.message[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateScreeningSeats = async (id: number) => {
    const seatStatus = screeningToShow.seats.find(
      (seat: any) => seat.id == id && seat.status != 'available'
    )

    if (seatStatus && seatId == id) {
      //Make avialable and reset seatId
      setSeatId(0)
      const {
        data,
      } = await axios.post(
        `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
        { chosenSeatId: id, update: 'available' }
      )
      if (data.ok) {
        if (data.message.errorMsg) {
          console.log(data.message.errorMsg)
        } else {
          handleGetMovie()
        }
      }
    } else if (seatStatus && seatId != id) {
      console.log('already taken')
      return
    } else if (!seatStatus && seatId == id) {
      setSeatId(id)
      const {
        data,
      } = await axios.post(
        `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
        { chosenSeatId: id, update: 'pending' }
      )
      if (data.ok) {
        if (data.message.errorMsg) {
          console.log(data.message.errorMsg)
        } else {
          handleGetMovie()
        }
      }
    } else if (!seatStatus && seatId != id && seatId != 0) {
      console.log('4')
      const {
        data,
      } = await axios.post(
        `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
        { chosenSeatId: id, update: 'pending' }
      )
      if (data.ok) {
        if (data.message.errorMsg) {
          console.log(data.message.errorMsg)
        } else {
          const {
            data,
          } = await axios.post(
            `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
            { chosenSeatId: seatId, update: 'available' }
          )
          if (data.ok) {
            if (data.message.errorMsg) {
              console.log(data.message.errorMsg)
            } else {
              setSeatId(id)
              handleGetMovie()
            }
          }
        }
      }
    } else if (!seatStatus && seatId == 0) {
      setSeatId(id)
      const {
        data,
      } = await axios.post(
        `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
        { chosenSeatId: id, update: 'pending' }
      )
      if (data.ok) {
        if (data.message.errorMsg) {
          console.log(data.message.errorMsg)
        } else {
          handleGetMovie()
        }
      }
    }
  }

  const calculateSit = (id: number) => {
    if (seatId == 0) {
      return
    }
    const row = Math.floor(id / 10) + 1
    const sit = Math.floor(id % 10)

    setDisplaySit({ sit, row })
  }

  const handleClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    setScreeningToshow(
      movie?.screenings.filter((screen) => {
        return screen._id === screeningToOrderId
      })[0]
    )
  }, [screeningToOrderId, movie])

  useEffect(() => {
    handleGetMovie()
  }, [])

  useEffect(() => {
    calculateSit(seatId)
  }, [seatId])

  return (
    <Box>
      <Box>
        {/*MOVIE info*/}
        <Typography variant="h4">Order now</Typography>
        <Typography>Choose Time:</Typography>
        <Select onChange={(ev: any) => setScreeningToOrderId(ev.target.value)}>
          {movie?.screenings.map((screening) => {
            const newDate = new Date(screening.dateTime)
            return (
              <MenuItem value={`${screening._id}`}>
                {`${newDate.getDate()}.${
                  newDate.getMonth() + 1
                } at ${newDate.getHours()}:${newDate.getMinutes()}`}
              </MenuItem>
            )
          })}
        </Select>
      </Box>
      <Box>
        {screeningToShow && screeningToShow._id ? (
          <Box>
            <Typography>Choose a sit</Typography>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: 'repeat(10, 10%)' }}
            >
              {screeningToShow.seats.map((seat: any) => {
                return (
                  <Box
                    key={seat.id}
                    onClick={() => {
                      handleUpdateScreeningSeats(seat.id)
                    }}
                    sx={{
                      color:
                        seat.status == 'taken'
                          ? 'red'
                          : seat.status === 'pending'
                          ? 'orange'
                          : 'green',
                    }}
                  >
                    <ChairIcon />
                  </Box>
                )
              })}
            </Box>
            {seatId ? (
              <Box>
                <Typography>
                  You chose sit number {displaySit.sit} in row number{' '}
                  {displaySit.row}
                </Typography>
                <Button
                  onClick={() => {
                    setShowModal(true)
                  }}
                  variant="contained"
                >
                  Order
                </Button>
              </Box>
            ) : null}
          </Box>
        ) : null}
      </Box>
      {showModal ? (
        <Dialog open={showModal}>
          <DialogTitle>Finish up:</DialogTitle>
          <DialogContent>
            {user && user.email ? (
              <TextField disabled value={user.email} />
            ) : (
              <TextField
                label="Email"
                required
                value={email}
                onInput={(ev:any) => {
                  setEmail(ev.target.value)
                }}
              />
            )}
            <Typography>
              You chose sit number {displaySit.sit} in row number{' '}
              {displaySit.row}. Do you wish to Procceed?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={user&& user.email || email ? false : true} onClick={handleClose} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </Box>
  )
}

export default OrderMovie
