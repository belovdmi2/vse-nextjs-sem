import NewCarForm from '@/components/NewCarForm'
import prisma from '@/utils/prisma'

const fetchBrands = async () => {
  const brands = await prisma.brand.findMany()
  return brands
}

const fetchModels = async () => {
  const models = await prisma.carModel.findMany()
  return models
}

const NewCarPage = async () => {
  const brands = await fetchBrands()
  const models = await fetchModels()

  return (
    <div className="pt-8">
      <h1 className="font-bold text-xl pb-4 text-center">Add car listing</h1>
      <NewCarForm brands={brands} models={models} />
    </div>
  )
}

export default NewCarPage
