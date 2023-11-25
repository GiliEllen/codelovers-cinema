import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { apiURL } from '../api/apiUrl'
import { useNavigate, useParams } from 'react-router-dom'
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
  Paper,
  Chip,
  Stack,
} from '@mui/material'
import { Movie } from '../types/types'
import ChairIcon from '@mui/icons-material/Chair'
import { useAppSelector } from '../app/hooks'
import { userSelector } from '../features/loggedInUser/loggedInUser'
import moment from 'moment'
import useToast from '../hooks/useToast'
import Toast from '../components/Toast'

const OrderMovie = () => {
  const [movie, setMovie] = useState<Movie>()
  const [screeningToOrderId, setScreeningToOrderId] = useState<string>()
  const [screeningToShow, setScreeningToshow] = useState<any>()
  const [seatId, setSeatId] = useState<number>(0)
  const [displaySit, setDisplaySit] = useState({ row: 0, sit: 0 })
  const [showModalOrder, setShowModalOrder] = useState(false)
  const [showModalError, setShowModalError] = useState(false)
  const [email, setEmail] = useState<string>('')

  //Toast related
  const { open, setOpen, msg, setMsg, toastStatus, setToastStatus } = useToast()

  const { movieId } = useParams()
  const user = useAppSelector(userSelector)
  const navigate = useNavigate()

  const handleGetMovie = async () => {
    try {
      const { data } = await axios.get(`${apiURL}/api/movies/${movieId}`)
      if (data.ok) {
        setMovie(data.message[0])
      }
    } catch (error) {
      console.error(error)
      setMsg('Somthing Went Wrong. Please try again later.')
      setToastStatus('error')
      setOpen(true)
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
          setMsg('Somthing Went Wrong. Please try agan later.')
          setToastStatus('error')
          setOpen(true)
        } else {
          handleGetMovie()
        }
      }
    } else if (seatStatus && seatId != id) {
      console.log('already taken')
      setMsg('This Sit Is Already Taken.')
      setToastStatus('warning')
      setOpen(true)
      return
    } else if (!seatStatus && seatId == id) {
      console.log("3")
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
          setMsg('Somthing Went Wrong. Please try agan later.')
          setToastStatus('error')
          setOpen(true)
        } else {
          handleGetMovie()
        }
      }
    } else if (!seatStatus && seatId != id && seatId != 0) {
      console.log(4)
      const {
        data,
      } = await axios.post(
        `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
        { chosenSeatId: id, update: 'pending' }
      )
      if (data.ok) {
        setMsg('Succssfully Saved This Seat!')
        setToastStatus('success')
        setOpen(true)
        if (data.message) {
          console.log(data.message)
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
      console.log(5)

      const {
        data,
      } = await axios.post(
        `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
        { chosenSeatId: id, update: 'pending' }
      )
      if (data.ok) {
        if (data.message) {
          console.log(data.message)
          setShowModalError(true)
        } else {
          setSeatId(id)
          setMsg('Succssfully Saved This Seat!')
          setToastStatus('success')
          setOpen(true)
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
    setShowModalOrder(false)
    setShowModalError(false)
  }

  const handleOrder = async () => {
    try {
      const {
        data,
      } = await axios.post(
        `${apiURL}/api/movies/screenings/${screeningToOrderId}`,
        { chosenSeatId: seatId, update: 'taken' }
      )
      if (data.ok) {
        setMsg('Succssfully Ordered!')
        setToastStatus('success')
        setOpen(true)
        setTimeout(() => {navigate('/')} ,2000)
        
      }
    } catch (error) {
      console.error(error)
      setMsg('Somthing Went Wrong. Please try agan later.')
      setToastStatus('error')
      setOpen(true)
    }
  }

  useEffect(() => {
    setScreeningToshow(
      movie?.screenings?.filter((screen) => {
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
    <Box width={'90vw'}>
      <Box
        sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
      >
        <Paper sx={{ minWidth: '35vw', padding: 3 }}>
          {movie ? (
            <Stack width={'30vw'} gap={3}>
              <Typography variant="h4">{movie.title}</Typography>
              <img width={'100%'} src={movie.image} alt={movie.title} />
              <Box>
                <Chip
                  color="primary"
                  label={`Duartion: ${movie.duration} minutes`}
                />
              </Box>
              <Typography>{movie.description}</Typography>
            </Stack>
          ) : null}
        </Paper>
        <Paper sx={{ minWidth: '50vw', padding: 3 }}>
          <Typography variant="h4">Order now</Typography>
          <Typography>Choose Time:</Typography>
          <Select
            sx={{ width: '20rem' }}
            onChange={(ev: any) => setScreeningToOrderId(ev.target.value)}
          >
            {movie?.screenings?.map((screening) => {
              const newDate = moment(screening.dateTime)
              return (
                <MenuItem value={`${screening._id}`}>
                  {`${moment(screening.dateTime).format('LLL')}`}
                </MenuItem>
              )
            })}
          </Select>
          <Box>
            {screeningToShow && screeningToShow._id ? (
              <Box>
                <Typography>Choose a sit</Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(10, 10%)',
                  }}
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
                        setShowModalOrder(true)
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
        </Paper>
      </Box>

      {showModalOrder ? (
        <Dialog open={showModalOrder}>
          <DialogTitle>Finish up:</DialogTitle>
          <DialogContent>
            {user && user.email ? (
              <TextField disabled value={user.email} />
            ) : (
              <TextField
                label="Email"
                required
                value={email}
                onInput={(ev: any) => {
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
            <Button
              disabled={(user && user.email) || email ? false : true}
              onClick={handleOrder}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
      <Dialog open={showModalError}>
        <DialogTitle>
          It seems this seat is being ordered right now.
        </DialogTitle>
        <DialogContent>Please Try a diffrent sit.</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      <Toast
        msg={msg}
        status={toastStatus ? toastStatus : 'info'}
        open={open}
        setOpen={setOpen}
      />
    </Box>
  )
}

export default OrderMovie
