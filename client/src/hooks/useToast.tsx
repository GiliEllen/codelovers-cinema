import React, {useState} from 'react'
import { AlertColor } from '@mui/material/Alert';

const useToast = () => {

    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState("")
    const [toastStatus, setToastStatus] = useState<AlertColor>()

  return {open, setOpen, msg, setMsg, toastStatus, setToastStatus}
}

export default useToast