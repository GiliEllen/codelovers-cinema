import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import EmptyImage from '../assets/203873-200.png'
import { useNavigate } from 'react-router-dom'
import Instructions from './Instructions'
import AddScreenings from './AddScreenings'
import { Movie } from '../types/types'
import { handleAddMovie } from '../api/moviesApi'
import useToast from '../hooks/useToast'
import Toast from './Toast'

const AddMovie = () => {
  const [step, setStep] = useState(1)
  const [movie, setMovie] = useState<Movie>({
    title: '',
    duration: 90,
    description: '',
  })
  const [movieId, setMovieId] = useState<string>()
  const [expanded, setExpanded] = useState<string | false>('panel1')
  const [screeningDate, setScreeningDate] = useState<string>()
  const [time, setTime] = useState<string>()
  const [times, setTimes] = useState<any[]>([])
  const [image, setImage] = useState<string>('')
  const [done, setDone] = useState(false)
  const { open, setOpen, msg, setMsg, toastStatus, setToastStatus } = useToast()

  const navigate = useNavigate()

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleInputForm = (
    ev: React.FormEvent<HTMLDivElement>,
    key: string
  ) => {
    setMovie({ ...movie, [key]: (ev.target as HTMLInputElement).value })
  }

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault()
      const data = await handleAddMovie(movie, image)
      if (data.ok) {
        setMovieId(data.message._id)
        setExpanded('panel2')
        setStep(2)
        setMsg('Movie Added SuccessFully.')
        setToastStatus('success')
        setOpen(true)
      }
    } catch (error) {
      console.error(error)
      setMsg('Somthing Went Wrong. Please try again later.')
      setToastStatus('error')
      setOpen(true)
    }
  }

  const convertIntoBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        console.log(fileReader.result)
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleFileUpload = async (ev: any) => {
    const file = ev.target.files[0]
    const base64 = await convertIntoBase64(file)
    //@ts-ignore
    setImage(base64)
  }

  return (
    <Paper>
      <Accordion
        disabled={step != 1}
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Add Movie
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '50%',
              gap: '30px',
            }}
          >
            {image ? (
              <Typography>Image was successfully uploaded</Typography>
            ) : (
              <Typography>Upload Image</Typography>
            )}
            <label htmlFor="file-upload" style={{ width: '200px' }}>
              <img
                src={image ? image : EmptyImage}
                alt="no image"
                style={{ margin: 'auto', width: '100%' }}
              />
            </label>
            <input
              type="file"
              aria-label="Image"
              name="myFile"
              id="file-upload"
              accept=".jpeg, .png, .jpg"
              onChange={(ev) => {
                handleFileUpload(ev)
              }}
            />

            <TextField
              label="title"
              sx={{ width: '100%' }}
              onInput={(ev) => {
                handleInputForm(ev, 'title')
              }}
              value={movie.title}
            />
            <TextField
              label="duration"
              type="number"
              sx={{ width: '100%' }}
              helperText={'In minutes'}
              onInput={(ev) => {
                handleInputForm(ev, 'duration')
              }}
              value={movie.duration}
            />
            <TextField
              label="description"
              minRows={3}
              multiline
              sx={{ width: '100%' }}
              onInput={(ev) => {
                handleInputForm(ev, 'description')
              }}
              value={movie.description}
            />
            <Button type="submit">Save and advance</Button>
          </form>
        </AccordionDetails>
      </Accordion>
      <Accordion
        // disabled={step != 2}
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Add Screenings
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <Typography>For movie: {movie.title}</Typography>
          <AddScreenings movie={movie} movieId={movieId} />
        </AccordionDetails>
      </Accordion>
      <Button
        onClick={() => {
          navigate('/')
        }}
      >
        I'm done
      </Button>
      <Toast
        msg={msg}
        status={toastStatus ? toastStatus : 'info'}
        open={open}
        setOpen={setOpen}
      />
    </Paper>
  )
}

export default AddMovie
