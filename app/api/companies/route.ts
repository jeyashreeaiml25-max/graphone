import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  const companies = await prisma.company.findMany({
    where: category ? { category } : undefined,
    orderBy: { trending_score: 'desc' },
  })

  return NextResponse.json(companies)
}