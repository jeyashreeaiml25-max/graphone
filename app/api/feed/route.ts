import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

export async function GET() {
  const feed = await prisma.feedItem.findMany({
    orderBy: { score: 'desc' },
    take: 20,
  })

  return NextResponse.json(feed)
}