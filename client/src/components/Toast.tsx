import React, { useState, FC } from 'react'
import { Stack, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} {...props} />
})

interface ToastProps {
  msg: string
  status: AlertColor,
  open:boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Toast: FC<ToastProps> = ({ msg, status, open, setOpen }) => {

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default Toast