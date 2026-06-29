import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create Investors
  const sequoia = await prisma.investor.create({ data: {
    slug: 'sequoia-capital',
    name: 'Sequoia Capital',
    description: 'Backing the daring from idea to iconic.',
    location: 'Menlo Park, California, USA',
    founded: 1972,
    type: 'VC',
    avg_check_size: '$10M–$100M',
    fund_number: 22,
  }})

  const a16z = await prisma.investor.create({ data: {
    slug: 'andreessen-horowitz',
    name: 'Andreessen Horowitz',
    description: 'Software is eating the world.',
    location: 'Menlo Park, California, USA',
    founded: 2009,
    type: 'VC',
    avg_check_size: '$5M–$50M',
    fund_number: 9,
  }})

  // Create Companies
  const openai = await prisma.company.create({ data: {
    slug: 'openai',
    name: 'OpenAI',
    description: 'AI research and deployment company.',
    website: 'https://openai.com',
    stage: 'Series F',
    category: 'AI Infrastructure',
    employeeCount: '1000+',
    founded: 2015,
    growth_score: 98,
    data_confidence_score: 95,
    trending_score: 99,
  }})

  const anthropic = await prisma.company.create({ data: {
    slug: 'anthropic',
    name: 'Anthropic',
    description: 'AI safety company building reliable AI systems.',
    website: 'https://anthropic.com',
    stage: 'Series E',
    category: 'AI Infrastructure',
    employeeCount: '500+',
    founded: 2021,
    growth_score: 94,
    data_confidence_score: 92,
    trending_score: 96,
  }})

  const cursor = await prisma.company.create({ data: {
    slug: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor built for speed and productivity.',
    website: 'https://cursor.sh',
    stage: 'Series C',
    category: 'AI Coding',
    employeeCount: '50+',
    founded: 2022,
    growth_score: 91,
    data_confidence_score: 88,
    trending_score: 94,
  }})

  const midjourney = await prisma.company.create({ data: {
    slug: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generator for creators and designers.',
    website: 'https://midjourney.com',
    stage: 'Bootstrapped',
    category: 'AI Image',
    employeeCount: '50+',
    founded: 2021,
    growth_score: 88,
    data_confidence_score: 85,
    trending_score: 90,
  }})

  const perplexity = await prisma.company.create({ data: {
    slug: 'perplexity',
    name: 'Perplexity',
    description: 'AI search engine for real-time answers.',
    website: 'https://perplexity.ai',
    stage: 'Series D',
    category: 'AI Search',
    employeeCount: '100+',
    founded: 2022,
    growth_score: 89,
    data_confidence_score: 87,
    trending_score: 92,
  }})

  // Create Investments
  await prisma.investment.createMany({ data: [
    { companyId: openai.id, investorId: sequoia.id, stage: 'Series F', amount: '$6.6B', date: new Date('2025-03-01'), isLead: false },
    { companyId: anthropic.id, investorId: sequoia.id, stage: 'Series E', amount: '$2.75B', date: new Date('2025-01-01'), isLead: true },
    { companyId: cursor.id, investorId: a16z.id, stage: 'Series C', amount: '$900M', date: new Date('2025-02-01'), isLead: true },
    { companyId: perplexity.id, investorId: a16z.id, stage: 'Series D', amount: '$500M', date: new Date('2025-01-01'), isLead: false },
  ]})

  // Create Jobs
  await prisma.job.createMany({ data: [
    {
      title: 'Senior Software Engineer',
      type: 'Full-time',
      salary: '$150k–$185k',
      location: 'Remote – New York City',
      remote: true,
      company: 'FutureFit AI',
      category: 'Engineering',
      applyUrl: '#',
    },
    {
      title: 'Frontend Engineer',
      type: 'Full-time',
      salary: '$150k–$225k',
      location: 'Boston',
      remote: false,
      company: 'General Medicine',
      category: 'Engineering',
      applyUrl: '#',
    },
    {
      title: 'Staff Frontend Engineer',
      type: 'Full-time',
      salary: '$220k–$300k',
      location: 'New York City',
      remote: false,
      company: 'Crosby',
      category: 'Engineering',
      applyUrl: '#',
    },
    {
      title: 'Senior Software Engineer (AI Agents)',
      type: 'Full-time',
      salary: '$200k–$240k',
      location: 'New York City',
      remote: true,
      company: 'Traba',
      category: 'Engineering',
      applyUrl: '#',
    },
    {
      title: 'Senior Product Manager (AI Agents)',
      type: 'Full-time',
      salary: '$180k–$210k',
      location: 'San Francisco',
      remote: false,
      company: 'Traba',
      category: 'Product',
      applyUrl: '#',
    },
    {
      title: 'Founding Designer',
      type: 'Full-time',
      salary: '$225k–$5.0%',
      location: 'Los Angeles',
      remote: false,
      company: 'Product.ai',
      category: 'Design',
      applyUrl: '#',
    },
  ]})

  // Create Feed Items
  await prisma.feedItem.createMany({ data: [
    { type: 'funding', title: 'OpenAI raised $6.6B Series F', body: 'Microsoft led the round.', entityId: openai.id, score: 99 },
    { type: 'funding', title: 'Anthropic raised $2.75B Series E', body: 'Amazon led the round.', entityId: anthropic.id, score: 96 },
    { type: 'funding', title: 'Cursor raised $900M Series C', body: 'Thrive Capital led the round.', entityId: cursor.id, score: 94 },
  ]})

  console.log('✅ Seed complete!')
}

main().catch(console.error).finally(() => prisma.$disconnect())