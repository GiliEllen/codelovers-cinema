import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar  from './components/Navbar'
import { Home } from './pages/Home'
import Register from './pages/Register'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
