import { Box, TextField, Typography } from '@mui/material'
import React from 'react'

const Register = () => {
  return (
    <Box>
        <Typography>Create your free account here:</Typography>
        <Box>
            <form>
                <TextField variant='outlined'></TextField>
            </form>
        </Box>
    </Box>
  )
}

export default Register