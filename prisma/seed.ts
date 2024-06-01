import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
  // create brands
  await prisma.brand.create({
    data: {
      id: '1',
      name: 'Skoda',
    },
  })
  await prisma.brand.create({
    data: {
      id: '2',
      name: 'BMW',
    },
  })
  await prisma.brand.create({
    data: {
      id: '3',
      name: 'Toyota',
    },
  })

  // create car models
  await prisma.carModel.create({
    data: {
      name: 'Fabia',
      brandId: '1',
    },
  })
  await prisma.carModel.create({
    data: {
      name: 'Octavia',
      brandId: '1',
    },
  })
  await prisma.carModel.create({
    data: {
      name: 'X5',
      brandId: '2',
    },
  })
  await prisma.carModel.create({
    data: {
      name: 'Corolla',
      brandId: '3',
    },
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
