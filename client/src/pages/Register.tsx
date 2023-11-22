import { Box, TextField, Typography, Paper } from '@mui/material'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { apiURL } from '../api/apiUrl'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

    const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (password === repeatPassword) {
        const { data } = await axios.post(`${apiURL}/api/users/register`, {
          email,
          password,
          firstName,
          lastName,
        }, { withCredentials: true })
        if (data.ok) {
            navigate("/")
        } else {
            console.log("somthing went wrong")
        }
      } else {
        console.log('not the same password')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box>
      <Paper
        sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>Create your free account here:</Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Email"
            type="email"
            value={email}
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setEmail((target as HTMLInputElement).value)
            }}
          />
          <TextField
            label="First Name"
            value={firstName}
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setFirstName((target as HTMLInputElement).value)
            }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setLastName((target as HTMLInputElement).value)
            }}
          />
          <TextField
            label="Password"
            value={password}
            type="password"
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setPassword((target as HTMLInputElement).value)
            }}
          />
          <TextField
            label="Repeat Password"
            value={repeatPassword}
            type="password"
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setRepeatPassword((target as HTMLInputElement).value)
            }}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Register
