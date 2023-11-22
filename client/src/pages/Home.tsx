import { Box, Typography } from '@mui/material'
import React, { Fragment } from 'react'

export const Home: React.FC = () => {
  return (
    <Fragment>
      {/*Big Image carosel*/}
      <Box>
        <img src="" alt="Image" />
      </Box>
      <Box>
        <Typography variant='h3'>Screening Now:</Typography>
        <Typography>Test</Typography>
      </Box>
      <Box>
        <Typography variant='h3'>Coming Soon:</Typography>
        <Typography>Test</Typography>
      </Box>
    </Fragment>
  )
}
