import CarItem from './CarItem'
import { CarWithDeps } from '@/types/prismaTypes'

type Props = {
  cars?: CarWithDeps[]
}

const CarList = ({ cars }: Props) => {
  if (!cars) {
    return null
  }

  return (
    <div className="pt-5">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  )
}

export default CarList
