import { Box, TextField, Typography, Paper } from '@mui/material'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { handleLogin } from '../api/authApi'
import useToast from '../hooks/useToast'
import Toast from '../components/Toast'

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { open, setOpen, msg, setMsg, toastStatus, setToastStatus } = useToast()

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data = await handleLogin(email, password)
      if (data.ok) {
        setMsg('Logged In successfully!')
        setToastStatus('success')
        setOpen(true)
        // for onRender.com, which does not allow cookies
        sessionStorage.setItem('userID', data.userDB._id)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.error(error)
      setMsg('Somthing Went Wrong. Please try again later.')
      setToastStatus('error')
      setOpen(true)
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <Paper
        sx={{
          marginTop: 3,
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
          padding: 3,
          height: 'fit-content',
        }}
      >
        <Typography variant="h4">Log In Here:</Typography>
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
            label="Password"
            value={password}
            type="password"
            onInput={(ev: React.FormEvent<HTMLDivElement>) => {
              const { target } = ev
              setPassword((target as HTMLInputElement).value)
            }}
          />
          <Button type="submit">LOG IN</Button>
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

export default Login
