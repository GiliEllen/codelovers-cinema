import React from 'react'
import { NavLink } from 'react-router-dom'
import { Box } from '@mui/material';

export const Navbar: React.FC = () => (
  <nav>
    <div className="nav-wrapper cyan darken-1 px1">
      <NavLink to="/" className="brand-logo">
        Gili's Cinema
      </NavLink>
      <ul className="right hide-on-med-and-down">
        <li cy-data="home-nav-link">
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <Box>Login</Box>
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
)
