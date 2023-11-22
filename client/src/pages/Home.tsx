import { Box, Typography } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import { useAppDispatch } from '../app/hooks'
import { login } from '../features/loggedInUser/userAPI'

export const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(login())
  },[])

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
