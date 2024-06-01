import CarList from '@/components/CarList'
import Loading from '@/components/commons/Loading'
import prisma from '@/utils/prisma'
import Link from 'next/link'

const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true,
    },
  })
  return cars
}

const HomePage = async () => {
  const cars = await getCars()

  if (!cars) {
    return <Loading />
  }

  return (
    <div>
      <CarList cars={cars} />
    </div>
  )
}

export default HomePage
