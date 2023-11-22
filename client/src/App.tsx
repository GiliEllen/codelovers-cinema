import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import { Home } from './pages/Home'
import Register from './pages/Register'
import { Box } from '@mui/material'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Box sx={{ paddingTop: '100px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
