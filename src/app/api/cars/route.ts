import prisma from '@/utils/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { URL } from 'url'

export const GET = async (request: NextRequest) => {
  const url = new URL(request.nextUrl.href)
  const params = url.searchParams

  let modelId = params.get('modelId') ?? undefined
  let brandId = params.get('brandId') ?? undefined
  let location = params.get('location') ?? undefined

  if (modelId === '') {
    modelId = undefined
  }
  if (brandId === '') {
    brandId = undefined
  }
  if (location === '') {
    location = undefined
  }
  
  const data = await prisma.car.findMany({
    include: {
      brand: true,
      model: true,
    },
    where: {
      brand: {
        id: brandId,
      },
      model: {
        id: modelId,
      },
      location: location,
    },
  })

  return NextResponse.json({ data })
}
