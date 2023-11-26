import { Box, TextField, Typography, Paper } from '@mui/material'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { handleRegister } from '../api/authApi'
import useToast from '../hooks/useToast'
import Toast from '../components/Toast'

const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const { open, setOpen, msg, setMsg, toastStatus, setToastStatus } = useToast()

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (password === repeatPassword) {
        const data = await handleRegister(email, password, firstName, lastName)
        if (data.ok) {
          setMsg('Registered successfully!')
          setToastStatus('success')
          setOpen(true)
          // for onRender.com, which does not allow cookies
          sessionStorage.setItem('userID', data.userDB._id)
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
      } else {
        setMsg('Passwords are not the same.')
        setToastStatus('error')
        setOpen(true)
      }
    } catch (error) {
      console.error(error)
      setMsg('Something went wrong. Please try again later')
      setToastStatus('error')
      setOpen(true)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          padding: 3,
        }}
      >
        <Typography variant="h4">Create your free account here:</Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            alignItems: 'center',
            gap: '30px',
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
        <Toast
          msg={msg}
          status={toastStatus ? toastStatus : 'info'}
          open={open}
          setOpen={setOpen}
        />
      </Paper>
    </Box>
  )
}

export default Register
