import LabeledValue from '@/components/commons/LabeledValue'
import Loading from '@/components/commons/Loading'
import prisma from '@/utils/prisma'
import Link from 'next/link'

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      model: true,
      brand: true,
    },
  })
  return car
}

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id)

  if (!car) {
    return <Loading />
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <LabeledValue label={'Brand'}>{car?.brand.name}</LabeledValue>
        <LabeledValue label={'Brand'}>{car?.brand.name}</LabeledValue>
        <LabeledValue label={'Brand'}>{car?.brand.name}</LabeledValue>
        <LabeledValue label={'Brand'}>{car?.brand.name}</LabeledValue>
        <LabeledValue label={'Brand'}>{car?.brand.name}</LabeledValue>
        <LabeledValue label={'Brand'}>{car?.brand.name}</LabeledValue>
      </div>
    </div>
  )
}

export default CarDetailPage
