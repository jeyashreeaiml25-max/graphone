'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const categories = ['All', 'Engineering', 'Product', 'Design', 'Sales', 'Marketing', 'Operations']
const locations = ['San Francisco', 'New York', 'Boston', 'Remote', 'London', 'Toronto', 'Berlin']

const trendingCompanies = [
  { name: 'OpenAI',     employees: '15,000+', jobs: 84,  stage: 'Private'   },
  { name: 'Anthropic',  employees: '1,200+',  jobs: 51,  stage: 'Series B'  },
  { name: 'Cursor',     employees: '65+',     jobs: 28,  stage: 'Series A'  },
  { name: 'Mistral AI', employees: '250+',    jobs: 20,  stage: 'Series B'  },
]

const trendingJobs = [
  { id: 1,  title: 'Principal Backend Engineer (Distributed Systems & Control Planes)', company: 'SmartVerify.ai', location: 'United States',  remote: true,  salary: '$140K–$175K CAD', category: 'Engineering', type: 'Full-time' },
  { id: 2,  title: 'Founding Software Engineer',                                        company: 'Lexi',           location: 'Boston',          remote: false, salary: '$100K–$150K',     category: 'Engineering', type: 'Full-time' },
  { id: 3,  title: 'Frontend Engineer (Boston)',                                         company: 'General Medicine', location: 'Boston',        remote: false, salary: '$150K–$225K',     category: 'Engineering', type: 'Full-time' },
  { id: 4,  title: 'Associate, BizOps & Analytics',                                     company: 'Jerry.ai',      location: 'New York',         remote: true,  salary: '$85K–$130K',      category: 'Operations',  type: 'Full-time' },
  { id: 5,  title: 'Senior Account Manager',                                             company: 'VidMob',        location: 'New York',         remote: true,  salary: '$120K–$130K',     category: 'Sales',       type: 'Full-time' },
]

const engineeringJobs = [
  { id: 6,  title: 'Full-Stack Engineer (Boston)',         company: 'General Medicine', location: 'Boston',         remote: false, salary: '$150K–$225K',     category: 'Engineering', type: 'Full-time' },
  { id: 7,  title: 'Staff Frontend Engineer',              company: 'Crosby',           location: 'New York City',  remote: false, salary: '$220k–$300k',     category: 'Engineering', type: 'Full-time' },
  { id: 8,  title: 'Senior Software Engineer (AI Agents)', company: 'Traba',            location: 'New York City',  remote: false, salary: '$200K–$240K',     category: 'Engineering', type: 'Full-time' },
  { id: 9,  title: 'Forward Deployed Engineer',            company: 'PermitFlow',       location: 'New York City',  remote: false, salary: '$120K–$240K',     category: 'Engineering', type: 'Full-time' },
  { id: 10, title: 'Senior Software Engineer',             company: 'Sardine',          location: 'United States',  remote: true,  salary: '$170K–$170K',     category: 'Engineering', type: 'Full-time' },
]

const productJobs = [
  { id: 11, title: 'Associate, Business Operations - Product Management', company: 'Jerry.ai',          location: 'Toronto',       remote: true,  salary: '$110K–$140K',  category: 'Product', type: 'Full-time' },
  { id: 12, title: 'Senior Product Manager (AI Agents)',                  company: 'Traba',             location: 'New York City', remote: false, salary: '$180K–$210K',  category: 'Product', type: 'Full-time' },
  { id: 13, title: 'Product Manager',                                     company: 'Skylight',          location: 'United States', remote: true,  salary: '$200K–$240k',  category: 'Product', type: 'Full-time' },
  { id: 14, title: 'Product Manager',                                     company: 'Corvee',            location: 'San Francisco', remote: false, salary: '$200K–$200K',  category: 'Product', type: 'Full-time' },
  { id: 15, title: 'Founding Head of Product',                            company: 'Workshop Ventures', location: 'United States', remote: true,  salary: '$175k–$200k',  category: 'Product', type: 'Full-time' },
]

const designJobs = [
  { id: 16, title: 'Founding Designer — AI-Native Consumer Experience', company: 'Product.ai', location: 'Los Angeles', remote: false, salary: '$225k–$300k', category: 'Design', type: 'Full-time' },
  { id: 17, title: 'Founding Designer',                                  company: 'kolo',       location: 'Canada',      remote: true,  salary: '$150K–$200k', category: 'Design', type: 'Full-time' },
]

function JobRow({ job, age = 'today' }: { job: any; age?: string }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '13px 12px', borderRadius: 10, cursor: 'pointer', transition: 'background 0.1s',
        borderBottom: '1px solid #F3F4F6',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 38, height: 38, background: '#F3F4F6', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 14, color: '#374151', flexShrink: 0,
          border: '1px solid #E5E7EB',
        }}>
          {job.company[0]}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: '#111827' }}>{job.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: '#374151' }}>{job.company}</span>
            <span>•</span>
            {job.remote && (
              <span style={{ background: '#F0FDF4', color: '#16A34A', fontSize: 11, padding: '1px 6px', borderRadius: 4, fontWeight: 500 }}>
                Remote
              </span>
            )}
            {!job.remote && (
              <span style={{ background: '#FFF7ED', color: '#EA580C', fontSize: 11, padding: '1px 6px', borderRadius: 4, fontWeight: 500 }}>
                In office
              </span>
            )}
            <span>{job.location}</span>
            {job.salary && <><span>•</span><span>{job.salary}</span></>}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 11, color: '#9CA3AF' }}>{age}</span>
        <button style={{
          fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 6, padding: '5px 14px',
          background: '#fff', color: '#374151', cursor: 'pointer', fontWeight: 500,
        }}>Save</button>
        <button style={{
          fontSize: 12, border: 'none', borderRadius: 6, padding: '5px 14px',
          background: '#EF4444', color: '#fff', cursor: 'pointer', fontWeight: 600,
        }}>Apply</button>
      </div>
    </div>
  )
}

export default function Jobs() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#fff', color: '#111827', minHeight: '100vh' }}>

      {/* TOP NAVBAR */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: '#fff', borderBottom: '1px solid #F3F4F6',
        height: 56, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, width: 180, textDecoration: 'none' }}>
          <div style={{
            width: 28, height: 28, background: '#EF4444', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1" fill="white" />
              <rect x="12" y="2" width="6" height="6" rx="1" fill="white" opacity="0.7" />
              <rect x="2" y="12" width="6" height="6" rx="1" fill="white" opacity="0.5" />
              <rect x="12" y="12" width="6" height="6" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>GraphOne</span>
        </Link>

        <div style={{
          flex: 1, maxWidth: 520, display: 'flex', alignItems: 'center',
          border: '1px solid #E5E7EB', borderRadius: 999, padding: '7px 14px', background: '#F9FAFB',
        }}>
          <svg style={{ width: 14, height: 14, marginRight: 8, flexShrink: 0 }} fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search startups, products, investors, jobs and news"
            style={{ flex: 1, outline: 'none', fontSize: 12.5, color: '#6B7280', background: 'transparent', border: 'none' }}
          />
          <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 8, background: '#E5E7EB', padding: '1px 5px', borderRadius: 4 }}>/</span>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <svg width="20" height="20" fill="none" stroke="#6B7280" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span style={{
              position: 'absolute', top: -4, right: -4, background: '#EF4444',
              color: '#fff', fontSize: 9, width: 14, height: 14, borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
            }}>12</span>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: 999,
            background: 'linear-gradient(135deg,#F97316,#EC4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>A</div>
        </div>
      </header>

      <div style={{ display: 'flex', paddingTop: 56 }}>

        {/* LEFT SIDEBAR */}
        <aside style={{
          width: 200, borderRight: '1px solid #F3F4F6', padding: '20px 12px',
          position: 'fixed', top: 56, height: 'calc(100vh - 56px)',
          background: '#fff', zIndex: 40, overflowY: 'auto',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { name: 'Home',        icon: '🏠', href: '/'          },
              { name: 'AI Startups', icon: '🚀', href: '/startups'  },
              { name: 'AI Products', icon: '📦', href: '/products'  },
              { name: 'Investors',   icon: '👥', href: '/investors' },
              { name: 'Jobs',        icon: '💼', href: '/jobs', active: true },
              { name: 'News',        icon: '📰', href: '/news'      },
            ].map(item => (
              <Link key={item.name} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10, fontSize: 13,
                padding: '8px 12px', borderRadius: 8, textDecoration: 'none',
                color: item.active ? '#EF4444' : '#6B7280',
                background: item.active ? '#FEF2F2' : 'transparent',
                fontWeight: item.active ? 600 : 400,
              }}>
                <span>{item.icon}</span>{item.name}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
            <p style={{ fontSize: 11, color: '#9CA3AF', padding: '0 12px', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Contribute
            </p>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, padding: '8px 12px', borderRadius: 8, color: '#6B7280', textDecoration: 'none' }}>
              🚀 Submit Startup
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, padding: '8px 12px', borderRadius: 8, color: '#6B7280', textDecoration: 'none' }}>
              ➕ Submit Product
            </a>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ marginLeft: 200, flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, padding: '28px 32px', minWidth: 0 }}>

            {/* HERO */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, background: '#EF4444', borderRadius: 999, display: 'inline-block' }}></span>
                <span style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Live AI Intelligence
                </span>
              </div>
              <h1 style={{ fontSize: 34, fontWeight: 900, color: '#111827', marginBottom: 8, letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
                Find what&apos;s <span style={{ color: '#EF4444' }}>next.</span>
              </h1>
              <p style={{ fontSize: 13.5, color: '#9CA3AF', marginBottom: 20 }}>
                Discover the best AI startups and find your next career opportunity.
              </p>

              {/* Search Bar */}
              <div style={{ display: 'flex', gap: 10, maxWidth: 620 }}>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center',
                  border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px',
                }}>
                  <svg style={{ width: 14, height: 14, marginRight: 8, flexShrink: 0 }} fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Job title"
                    style={{ flex: 1, outline: 'none', fontSize: 13, color: '#374151', background: 'transparent', border: 'none' }}
                  />
                </div>
                <div style={{
                  flex: 1, display: 'flex', alignItems: 'center',
                  border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px',
                }}>
                  <span style={{ marginRight: 8, fontSize: 14 }}>📍</span>
                  <input
                    type="text"
                    placeholder="Location"
                    style={{ flex: 1, outline: 'none', fontSize: 13, color: '#374151', background: 'transparent', border: 'none' }}
                  />
                </div>
                <button style={{
                  background: '#EF4444', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '10px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}>
                  Search
                </button>
              </div>
            </div>

            {/* TRENDING COMPANIES */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>Trending startups hiring now</h2>
                <a href="#" style={{ fontSize: 12, color: '#EF4444', textDecoration: 'none' }}>View all companies →</a>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {trendingCompanies.map(company => (
                  <div key={company.name} style={{
                    flex: 1, border: '1px solid #E5E7EB', borderRadius: 12, padding: 16, cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                  >
                    <div style={{
                      width: 44, height: 44, background: '#111827', borderRadius: 10, marginBottom: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 18, color: '#fff',
                    }}>
                      {company.name[0]}
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 10, margin: '0 0 10px 0' }}>
                      {company.name} <span style={{ color: '#3B82F6' }}>✓</span>
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280' }}>
                        <span>👥</span><span>{company.employees}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280' }}>
                        <span>💼</span><span>{company.jobs} jobs</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B7280' }}>
                        <span>📈</span><span>{company.stage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORY FILTER */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  fontSize: 12, padding: '6px 14px', borderRadius: 999, cursor: 'pointer',
                  fontWeight: activeCategory === cat ? 700 : 400,
                  color: activeCategory === cat ? '#fff' : '#6B7280',
                  background: activeCategory === cat ? '#EF4444' : '#F3F4F6',
                  border: 'none', transition: 'all 0.15s',
                }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* TRENDING JOBS SECTION */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>Trending startup jobs</h2>
                <a href="#" style={{ fontSize: 12, color: '#EF4444', textDecoration: 'none' }}>View all jobs →</a>
              </div>
              <div>
                {trendingJobs.map(job => (
                  <JobRow key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* ENGINEERING JOBS */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>Engineering jobs</h2>
                <a href="#" style={{ fontSize: 12, color: '#EF4444', textDecoration: 'none' }}>View all engineering jobs →</a>
              </div>
              <div>
                {engineeringJobs.map(job => (
                  <JobRow key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* PRODUCT JOBS */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>Product jobs</h2>
                <a href="#" style={{ fontSize: 12, color: '#EF4444', textDecoration: 'none' }}>View all product jobs →</a>
              </div>
              <div>
                {productJobs.map(job => (
                  <JobRow key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* DESIGN JOBS */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <h2 style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: 0 }}>Design jobs</h2>
                <a href="#" style={{ fontSize: 12, color: '#EF4444', textDecoration: 'none' }}>View all design jobs →</a>
              </div>
              <div>
                {designJobs.map(job => (
                  <JobRow key={job.id} job={job} age="1 week ago" />
                ))}
              </div>
            </div>

            <button style={{
              width: '100%', marginTop: 8, padding: '12px 0',
              border: '1px solid #E5E7EB', borderRadius: 10,
              fontSize: 13, color: '#6B7280', background: '#fff', cursor: 'pointer',
            }}>
              Load more jobs ↓
            </button>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside style={{ width: 250, padding: '24px 16px', borderLeft: '1px solid #F3F4F6', flexShrink: 0 }}>

            {/* Email signup */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Get new jobs in your inbox</p>
              <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 10 }}>
                Join 50K+ professionals getting AI jobs handpicked daily.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  width: '100%', border: '1px solid #E5E7EB', borderRadius: 8,
                  padding: '8px 10px', fontSize: 12, marginBottom: 8,
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
              <button style={{
                width: '100%', background: '#EF4444', color: '#fff', fontSize: 12,
                padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                fontWeight: 600, marginBottom: 8,
              }}>
                Sign up
              </button>
              <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', margin: '0 0 8px 0' }}>No spam. Unsubscribe anytime.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ flex: 1, height: 1, background: '#F3F4F6' }} />
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>or</span>
                <div style={{ flex: 1, height: 1, background: '#F3F4F6' }} />
              </div>
              <button style={{
                width: '100%', border: '1px solid #E5E7EB', color: '#374151', fontSize: 12,
                padding: '8px 0', borderRadius: 8, background: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>
                <span style={{ fontWeight: 700, color: '#4285F4' }}>G</span> Sign up with Google
              </button>
            </div>

            {/* Level up */}
            <div style={{ marginBottom: 20, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Level up your job search</p>
              {[
                { icon: '🔍', text: 'Unique jobs in niche industries' },
                { icon: '💰', text: 'Set salary & equity upfront' },
                { icon: '🎯', text: 'Personalized job filters' },
                { icon: '📄', text: 'Showcase skills beyond a resume' },
                { icon: '📩', text: 'Let founders and recruiters reach out' },
              ].map(item => (
                <p key={item.text} style={{ fontSize: 12, color: '#6B7280', marginBottom: 8, display: 'flex', gap: 8 }}>
                  <span>{item.icon}</span>{item.text}
                </p>
              ))}
              <button style={{
                width: '100%', border: '1px solid #E5E7EB', color: '#374151', fontSize: 12,
                padding: '8px 0', borderRadius: 8, background: '#fff', cursor: 'pointer', marginTop: 8,
              }}>
                Sign up &amp; search
              </button>
            </div>

            {/* Know your worth */}
            <div style={{ marginBottom: 20, paddingTop: 16, borderTop: '1px solid #F3F4F6', background: '#FFF7F7', borderRadius: 10, padding: 14 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Know your worth</p>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
                Know your worth. Filter by industry, job title, location &amp; more.
              </p>
              <button style={{
                width: '100%', border: '1px solid #E5E7EB', color: '#374151', fontSize: 12,
                padding: '8px 0', borderRadius: 8, background: '#fff', cursor: 'pointer',
              }}>
                Salary calculator
              </button>
            </div>

            {/* Job alert */}
            <div style={{ marginBottom: 20, paddingTop: 16, borderTop: '1px solid #F3F4F6', background: '#FFF7F7', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>🔔</span>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', margin: 0 }}>Never miss the right opportunity</p>
              </div>
              <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
                Get notified when new AI jobs match your interests and skills.
              </p>
              <button style={{
                width: '100%', background: '#EF4444', color: '#fff', fontSize: 12,
                padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600,
              }}>
                Create job alert
              </button>
            </div>

            {/* Locations */}
            <div style={{ paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111827', marginBottom: 8 }}>Explore all locations</p>
              {locations.map(loc => (
                <a key={loc} href="#" style={{ display: 'block', fontSize: 12, color: '#6B7280', textDecoration: 'none', marginBottom: 6 }}>
                  {loc}
                </a>
              ))}
              <a href="#" style={{ fontSize: 12, color: '#EF4444', textDecoration: 'none' }}>View all locations →</a>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}