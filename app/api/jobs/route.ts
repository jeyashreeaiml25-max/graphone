import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')

  const jobs = await prisma.job.findMany({
    where: category ? { category } : undefined,
    orderBy: { postedAt: 'desc' },
  })

  return NextResponse.json(jobs)
}