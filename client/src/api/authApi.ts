import axios from 'axios'
import { apiURL } from './apiUrl'

export const handleLogin = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(
      `${apiURL}/api/users/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    )
    return data
  } catch (error) {
    console.error(error)
  }
}

export const handleRegister = async (email:string, password:string, firstName:string, lastName:string) => {
    try {
        const { data } = await axios.post(`${apiURL}/api/users/register`, {
            email,
            password,
            firstName,
            lastName,
          }, { withCredentials: true })
          return data
    } catch (error) {
        console.error(error)
    }
}