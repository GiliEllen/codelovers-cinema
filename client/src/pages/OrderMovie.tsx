import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { apiURL } from '../api/apiUrl'
import { useParams } from 'react-router-dom'

const OrderMovie = () => {
    const [movie, setMovie] = useState()
    const {movieId} = useParams()

    const handleGetMovie = async () => {
        try {
            const {data} = await axios.get(`${apiURL}/api/movies/${movieId}`)
            if (data.ok) {
                setMovie(data.message)
            }
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleGetMovie()
    },[])
  return (
    <div>OrderMovie</div>
  )
}

export default OrderMovie