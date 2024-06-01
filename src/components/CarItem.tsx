import { CarWithDeps } from '@/types/prismaTypes'
import Link from 'next/link'

const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <Link
      href={`car/${car.id}`}
      className="font-semibold text-rose-950 transition duration-300 ease-in-ou p-2.5 rounded-md  w-24 text-center"
    >
      <div className="flex justify-between px-4 py-3 bg-white/40 backdrop-blur-md rounded-md mb-2 hover:bg-white/70 hover:backdrop-blur-lg">
        <div className="w-44 text-left">{car.model.name}</div>
        <div className="w-24">{car?.year ?? '-'}</div>
        <div>
          <div className="w-40 inline-block">{car?.price ?? '-'}</div> USD
        </div>
      </div>
    </Link>
  )
}

export default CarItem
