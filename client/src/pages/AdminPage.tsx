import React, { useState } from 'react'
import {
  Box,
  Stack,
  ButtonGroup,
  Paper,
  Button,
  Typography,
} from '@mui/material'
import MovieCreationIcon from '@mui/icons-material/MovieCreation'
import AddMovie from '../components/AddMovie'
import UpdateMovie from '../components/UpdateMovie'

const AdminPage = () => {
  const [page, setPage] = useState<string>('')
  return (
    <Box>
      <ButtonGroup sx={{ width: '100%' }} variant="text">
        <Button
          onClick={() => {
            setPage('add')
          }}
        >
          ADD Movie
        </Button>
        <Button
          onClick={() => {
            setPage('edit')
          }}
        >
          Edit Movie and Screenings
        </Button>
        <Button
          onClick={() => {
            setPage('remove')
          }}
        >
          Delete Movie
        </Button>
      </ButtonGroup>
      <Paper sx={{padding:3}}>
        {page === 'add' ? <AddMovie /> : null}
        {page === 'edit' ? <UpdateMovie/> : null}
        {page === 'remove' ? <></> : null}
      </Paper>
    </Box>
  )
}

export default AdminPage
