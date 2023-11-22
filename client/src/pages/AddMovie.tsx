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
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'
import { TimePicker } from '@mui/x-date-pickers'

const AddMovie = () => {
  const [step, setStep] = useState(1)
  const [movie, setMovie] = useState({
    title: '',
    duration: 90,
    description: '',
  })
  const [expanded, setExpanded] = useState<string | false>('panel1')
  const [screeningDate, setScreeningDate] = useState<string>()
  const [time, setTime] = useState<string>()
  const [times, setTimes] = useState<any[]>([])

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
    //@ts-ignore
    setMovie({ ...movie, [key]: ev.target.value })
  }

  const handleAddMovie = async (ev: React.FormEvent<HTMLFormElement>) => {
    try {
      ev.preventDefault()
      const { data } = await axios.post(
        `${apiURL}/movies`,
        { movie },
        { withCredentials: true }
      )

      if (data.ok) {
        setStep(2)
      }
    } catch (error) {
      console.error(error)
    }
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
            onSubmit={handleAddMovie}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '50%',
              gap: '30px',
            }}
          >
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
        //   disabled={step != 2}
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
        <AccordionDetails>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Insructions
            </AccordionSummary>
            <AccordionDetails>
              <Typography>To add screenings:</Typography>
              <Typography>1. Choose a date</Typography>
              <Typography>2. Choose a time and click add</Typography>
              <Typography>
                3. After picking all requested screenings Times, Click Save aat
                the end.
              </Typography>
              <Typography>
                * if you wish to remove a screening time, click on it
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Typography>Choose a Date:</Typography>
          {/* <DatePicker
            value={screeningDate}
            onChange={(newValue) => setScreeningDate(newValue)}
          /> */}
          <input
            type="date"
            id=""
            value={screeningDate}
            onChange={(ev) => setScreeningDate(ev.target.value)}
          />
          {screeningDate ? (
            <Box>
              <Typography>Choose Times:</Typography>
              {/* <TimePicker
                value={time}
                onChange={(newValue) => setTime(newValue)}
              /> */}
              <input
                type="time"
                id=""
                value={time}
                onChange={(ev) => setTime(ev.target.value)}
              />
              <Button
                onClick={(ev: any) => {
                  setTimes([...times, time])
                }}
                variant="contained"
              >
                ADD
              </Button>
              <Box>
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
                      {timeBox}
                    </Paper>
                  )
                })}
              </Box>
            </Box>
          ) : null}
        </AccordionDetails>
      </Accordion>
    </Paper>
  )
}

export default AddMovie
