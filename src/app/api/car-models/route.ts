import prisma from '@/utils/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const data = await prisma.carModel.findMany()

  return NextResponse.json({ data })
}