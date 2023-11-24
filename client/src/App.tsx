import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home } from './pages/Home'
import Register from './pages/Register'
import { Box } from '@mui/material'
import Login from './pages/Login'
import AddMovie from './components/AddMovie'
import OrderMovie from './pages/OrderMovie'
import Auth from './components/auth/Auth'
import { UserRole } from './features/loggedInUser/usersModel'
import AdminPage from './pages/AdminPage'

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
          <Route path="/movie/:movieId" element={<OrderMovie />} />
          <Route element={<Auth allowedRoles={[UserRole.ADMIN]} />}>
            <Route path="/admin-page" element={<AdminPage />} />
          </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
