import React, { FC } from 'react'

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Instructions: FC = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Insructions
        </AccordionSummary>
        <AccordionDetails>
          <Typography>To add screenings:</Typography>
          <Typography>1. Choose a date</Typography>
          <Typography>2. Choose a time and click add</Typography>
          <Typography>
            3. After picking all requested screenings Times, Click Save aat the
            end.
          </Typography>
          <Typography>
            * If you wish to remove a screening time, click on it
          </Typography>
          <Typography>
            * Notice that after saving a screening, you cannot update it.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default Instructions
