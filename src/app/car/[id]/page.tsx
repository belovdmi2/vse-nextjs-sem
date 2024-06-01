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
    <div className="pt-8">
      <div className="flex flex-col gap-5">
        <LabeledValue label={'Brand'}>{car?.brand.name}</LabeledValue>
        <LabeledValue label={'Model'}>{car?.model.name}</LabeledValue>
        <LabeledValue label={'Price'}>{`${car.price ?? '-'} USD`}</LabeledValue>
        <LabeledValue label={'Color'}>{car?.color}</LabeledValue>
        <LabeledValue label={'Location'}>{car?.location}</LabeledValue>
        <LabeledValue label={'Year of manufacture'}>{car?.year}</LabeledValue>
        <LabeledValue label={'Created'}>
          {car.createdAt.toLocaleString()}
        </LabeledValue>
        <LabeledValue label={'Last update'}>
          {car.updatedAt.toLocaleString()}
        </LabeledValue>
      </div>
    </div>
  )
}

export default CarDetailPage
