import { FC, useState } from 'react'

interface CarouselProps {
  images: string[]
}

export const Carousel: FC<CarouselProps> = ({ images }) => {
  const [index, setIndex] = useState<number>(0)
  const length = images.length

  const handleChangeIndex = () => {
    if (index! >= length - 1) {
      setIndex(0)
    } else if (index! > length) {
      setIndex(0)
    } else {
      setIndex((prevState) => prevState! + 1)
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        overflow: 'hidden',
        width: '90%',
        height: '250px',
        zIndex: "-1"
      }}
    >
      <img
        width={'100%'}
        src={images[index]}
        onMouseOver={() => {
          handleChangeIndex()
        }}
        alt="movie poster"
      />
    </div>
  )
}
