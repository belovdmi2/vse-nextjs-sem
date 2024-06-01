import prisma from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { URL } from 'url'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.nextUrl.href)
  const params = url.searchParams

  let model = params.get('model') ?? undefined
  let brand = params.get('brand') ?? undefined
  let location = params.get('location') ?? undefined

  if (model === '') {
    model = undefined
  }
  if (brand === '') {
    brand = undefined
  }
  if (location === '') {
    location = undefined
  }

  console.log({ model, brand, location })

  const data = await prisma.car.findMany({
    include: {
      brand: true,
      model: true,
    },
    where: {
      brand: {
        name: brand,
      },
      model: {
        name: model,
      },
      location: location,
    },
  })

  return NextResponse.json({ data })
}
