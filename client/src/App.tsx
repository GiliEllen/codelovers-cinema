import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home } from './pages/Home'
import Register from './pages/Register'
import { Box } from '@mui/material'
import Login from './pages/Login'
import AddMovie from './pages/AddMovie'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ paddingTop: '100px', width: '90%', margin: 'auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-movie" element={<AddMovie />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
