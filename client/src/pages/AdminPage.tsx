import { useState } from 'react'
import { Box, ButtonGroup, Paper, Button } from '@mui/material'
import AddMovie from '../components/AddMovie'
import UpdateMovie from '../components/UpdateMovie'
import DeleteMovie from '../components/DeleteMovie'

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
      <Paper sx={{ padding: 3 }}>
        {page === 'add' ? <AddMovie /> : null}
        {page === 'edit' ? <UpdateMovie /> : null}
        {page === 'remove' ? <DeleteMovie /> : null}
      </Paper>
    </Box>
  )
}

export default AdminPage
