import { motion } from 'framer-motion'
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

interface CarouselProps {
  images: string[]
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
  const [index, setIndex] = useState<number>(0)
  const length = images.length

  const handleChangeIndex = () => {
    if (index! >= length - 1) {
      console.log(index)
      setIndex(0)
    } else if (index! > length) {
      console.log("rnte 2 ")
      setIndex(0)
    } else {
      console.log("rnter 3" + index)
      setIndex((prevState) => prevState! + 1)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        overflow: 'hidden',
        width: '90%',
        height: '250px',
      }}
    >
      <button
        onClick={() => {
          handleChangeIndex()
        }}
      >
        gygfysag
      </button>
      <img width={'100%'} src={images[index]} onMouseOver={() => {handleChangeIndex()}} alt="" />
    </div>
  )
}
