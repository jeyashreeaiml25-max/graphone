'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const categories = ['All', 'Chat', 'Code', 'Agents', 'Image', 'Video', 'Voice', 'Productivity', 'More']
const popularSearches = ['Databricks', 'Notion', 'Pinecone', 'Weaviate', 'LangChain']
const trendingSearches = ['Cursor', 'Claude', 'Vibe Coding', 'Lovable', 'Perplexity', 'Midjourney', 'Runway', 'MCP', 'AI Agents', 'AI Notetaker']

const floatingCards = [
  { name: 'OpenAI',     top: 10,  right: 160 },
  { name: 'Anthropic',  top: 90,  right: 310 },
  { name: 'Cursor',     top: 15,  right: 10  },
  { name: 'Midjourney', top: 180, right: 280 },
  { name: 'Perplexity', top: 185, right: 10  },
]

const popularNow = [
  { name: 'Cursor',     desc: 'AI code editor'   },
  { name: 'Claude',     desc: 'AI assistant'      },
  { name: 'Lovable',    desc: 'AI app builder'    },
  { name: 'Midjourney', desc: 'Image generator'   },
  { name: 'Perplexity', desc: 'AI search'         },
  { name: 'Runway',     desc: 'Video generator'   },
]

const trendingLabels: Record<string, { label: string; bg: string; color: string }> = {
  'OpenAI':     { label: 'Most used this week',  bg: '#FFF7ED', color: '#F97316' },
  'Anthropic':  { label: 'Most used this week',  bg: '#FFF7ED', color: '#F97316' },
  'Cursor':     { label: 'Trending in Coding',   bg: '#F0FDF4', color: '#16A34A' },
  'Midjourney': { label: 'Top rated in Image',   bg: '#EFF6FF', color: '#2563EB' },
  'Perplexity': { label: 'Most used this week',  bg: '#FFF7ED', color: '#F97316' },
}

const fakeLikes:    Record<string, string> = { 'OpenAI':'8.3K','Anthropic':'6.7K','Cursor':'5.5K','Midjourney':'5.1K','Perplexity':'3.9K' }
const fakeComments: Record<string, string> = { 'OpenAI':'173', 'Anthropic':'89', 'Cursor':'386', 'Midjourney':'341','Perplexity':'210'  }

const domains: Record<string, string> = {
  'OpenAI':'openai.com','Anthropic':'anthropic.com','Cursor':'cursor.sh',
  'Midjourney':'midjourney.com','Perplexity':'perplexity.ai',
  'Claude':'anthropic.com','Lovable':'lovable.dev','Runway':'runwayml.com',
}

const bgColors: Record<string, string> = {
  'OpenAI':'#000000','Anthropic':'#D97706','Cursor':'#1F2937',
  'Midjourney':'#1D4ED8','Perplexity':'#0EA5E9','Claude':'#F97316',
  'Lovable':'#EC4899','Runway':'#16A34A',
}

function CompanyLogo({ name, size = 40 }: { name: string; size?: number }) {
  const [err, setErr] = useState(false)
  const domain = domains[name]
  if (!domain || err) {
    return (
      <div 
  style={{ width: size, height: size, background: bgColors[name] || '#6B7280', bo... }}
  className="flex items-center justify-center text-white font-bold shrink-0"
>
  <span style={{ fontSize: size * 0.3 }}>{name.slice(0,2).toUpperCase()}</span>
</div>
    )
  }
  return (
    <img src={`https://logo.clearbit.com/${domain}`} alt={name}
      style={{ width: size, height: size, borderRadius: 10, border: '1px solid #F3F4F6', objectFit: 'cover' }}
      className="shrink-0"
      onError={() => setErr(true)}/>
  )
}

export default function Home() {
  const [companies, setCompanies]       = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeTab, setActiveTab]       = useState('Most Popular')

  useEffect(() => {
    fetch('/api/companies').then(r => r.json()).then(setCompanies)
  }, [])

  return (
    <div style={{ fontFamily: "'Inter','Segoe UI',sans-serif", background: '#fff', color: '#111827', minHeight: '100vh' }}>

      {/* ══ TOP NAVBAR ══ */}
      <header style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, background:'#fff', borderBottom:'1px solid #F3F4F6', height:56, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
        <Link href="/" style={{ display:'flex', alignItems:'center', gap:8, width:200, textDecoration:'none' }}>
          <div style={{ width:28, height:28, background:'#EF4444', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1" fill="white"/>
              <rect x="12" y="2" width="6" height="6" rx="1" fill="white" opacity="0.7"/>
              <rect x="2" y="12" width="6" height="6" rx="1" fill="white" opacity="0.5"/>
              <rect x="12" y="12" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
            </svg>
          </div>
          <span style={{ fontWeight:700, fontSize:15, color:'#111827' }}>GraphOne</span>
        </Link>

        <div style={{ flex:1, maxWidth:500, display:'flex', alignItems:'center', border:'1px solid #E5E7EB', borderRadius:999, padding:'6px 14px', background:'#F9FAFB' }}>
          <svg style={{ width:14, height:14, color:'#9CA3AF', marginRight:8, flexShrink:0 }} fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Search startups, products, investors, jobs and news"
            style={{ flex:1, outline:'none', fontSize:12.5, color:'#6B7280', background:'transparent', border:'none' }}/>
          <span style={{ color:'#D1D5DB', fontSize:11, border:'1px solid #D1D5DB', borderRadius:4, padding:'1px 4px', marginRight:6 }}>/</span>
          <button style={{ background:'#EF4444', color:'#fff', borderRadius:999, width:26, height:26, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, border:'none', cursor:'pointer', flexShrink:0 }}>→</button>
        </div>

        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ position:'relative', cursor:'pointer' }}>
            <svg style={{ width:20, height:20 }} fill="none" stroke="#6B7280" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span style={{ position:'absolute', top:-4, right:-4, width:16, height:16, background:'#EF4444', borderRadius:999, color:'#fff', fontSize:9, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700 }}>9</span>
          </div>
          <div style={{ width:32, height:32, borderRadius:999, background:'linear-gradient(135deg,#F97316,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer' }}>A</div>
        </div>
      </header>

      <div style={{ display:'flex', paddingTop:56 }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ width:200, borderRight:'1px solid #F3F4F6', padding:'20px 12px', position:'fixed', top:56, height:'calc(100vh - 56px)', background:'#fff', zIndex:40, overflowY:'auto' }}>
          <nav style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {[
              { name:'Home',        icon:'🏠', active:true,  href:'/'           },
              { name:'AI Startups', icon:'🚀', active:false, href:'/startups'   },
              { name:'AI Products', icon:'📦', active:false, href:'/products'   },
              { name:'Investors',   icon:'👥', active:false, href:'/investors'  },
              { name:'Jobs',        icon:'💼', active:false, href:'/jobs'       },
              { name:'News',        icon:'📰', active:false, href:'/news'       },
            ].map(item => (
              <Link key={item.name} href={item.href} style={{
                display:'flex', alignItems:'center', gap:10, fontSize:13, padding:'8px 12px', borderRadius:8, textDecoration:'none',
                color: item.active ? '#EF4444' : '#6B7280',
                background: item.active ? '#FEF2F2' : 'transparent',
                fontWeight: item.active ? 600 : 400,
              }}>
                <span style={{ fontSize:15 }}>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div style={{ marginTop:20, paddingTop:16, borderTop:'1px solid #F3F4F6' }}>
            <p style={{ fontSize:11, color:'#9CA3AF', padding:'0 12px', marginBottom:6, textTransform:'uppercase', letterSpacing:'0.08em' }}>Contribute</p>
            {[{ name:'Submit Startup', icon:'🚀' },{ name:'Submit Product', icon:'➕' }].map(item => (
              <a key={item.name} href="#" style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, padding:'8px 12px', borderRadius:8, color:'#6B7280', textDecoration:'none' }}>
                {item.icon} {item.name}
              </a>
            ))}
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ marginLeft:200, flex:1, display:'flex' }}>
          <div style={{ flex:1, padding:'28px 32px', maxWidth:760 }}>

            {/* HERO */}
            <section style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:28 }}>
              <div style={{ flex:1, maxWidth:400 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
                  <span style={{ width:8, height:8, background:'#EF4444', borderRadius:999, display:'inline-block' }}></span>
                  <span style={{ fontSize:11, color:'#EF4444', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.15em' }}>Live AI Intelligence</span>
                </div>
                <h1 style={{ fontSize:36, fontWeight:900, lineHeight:1.15, color:'#111827', marginBottom:12, letterSpacing:'-0.02em' }}>
                  The Global Intelligence<br/>
                  Layer <span style={{ color:'#EF4444' }}>for AI.</span>
                </h1>
                <p style={{ fontSize:13.5, color:'#9CA3AF', marginBottom:20, lineHeight:1.6 }}>
                  One graph connecting companies, founders, investors, products, funding and talent.
                </p>
                <div style={{ display:'flex', alignItems:'center', border:'1px solid #E5E7EB', borderRadius:999, padding:'10px 16px', boxShadow:'0 1px 3px rgba(0,0,0,0.06)' }}>
                  <svg style={{ width:15, height:15, marginRight:8, flexShrink:0 }} fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input type="text" placeholder="Search companies, founders, investors, products or funding rounds..."
                    style={{ flex:1, outline:'none', fontSize:12.5, color:'#6B7280', background:'transparent', border:'none' }}/>
                  <button style={{ background:'#EF4444', color:'#fff', borderRadius:999, width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, border:'none', cursor:'pointer', flexShrink:0 }}>→</button>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:12, flexWrap:'wrap' }}>
                  <span style={{ fontSize:12, color:'#9CA3AF' }}>Most searched</span>
                  {popularSearches.map(tag => (
                    <span key={tag} style={{ fontSize:12, color:'#374151', border:'1px solid #E5E7EB', borderRadius:999, padding:'3px 10px', cursor:'pointer', background:'#fff' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* FLOATING COMPANY LOGOS */}
              <div style={{ position:'relative', width:320, height:260, flexShrink:0, marginLeft:24 }}>
                {/* Center hub */}
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:56, height:56, background:'#EF4444', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 24px rgba(239,68,68,0.35)', zIndex:10 }}>
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="6" height="6" rx="1" fill="white"/>
                    <rect x="12" y="2" width="6" height="6" rx="1" fill="white" opacity="0.7"/>
                    <rect x="2" y="12" width="6" height="6" rx="1" fill="white" opacity="0.5"/>
                    <rect x="12" y="12" width="6" height="6" rx="1" fill="white" opacity="0.3"/>
                  </svg>
                </div>
                {/* Dots */}
                {[[60,80],[120,40],[200,70],[240,150],[170,200],[80,180],[280,100],[150,250]].map(([t,l],i) => (
                  <div key={i} style={{ position:'absolute', top:t, left:l, width:5, height:5, background:'#FCA5A5', borderRadius:999, opacity:0.7 }}/>
                ))}
                {/* Floating cards */}
                {floatingCards.map(card => (
                  <div key={card.name} style={{ position:'absolute', top:card.top, right:card.right, background:'#fff', border:'1px solid #F3F4F6', borderRadius:12, padding:'8px 12px', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 12px rgba(0,0,0,0.08)', zIndex:5 }}>
                    <CompanyLogo name={card.name} size={26}/>
                    <span style={{ fontSize:12, fontWeight:600, color:'#111827' }}>{card.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* COLLECTION OF THE WEEK */}
            <section style={{ background:'linear-gradient(135deg,#FFF7ED,#FEF2F2)', border:'1px solid #FED7AA', borderRadius:16, padding:20, marginBottom:24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:11, color:'#F97316', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:4 }}>🔥 Collection of the week</p>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:20 }}>🔥</span>
                  <h3 style={{ fontSize:17, fontWeight:800, color:'#111827' }}>Vibe Coding Tools</h3>
                </div>
                <p style={{ fontSize:12, color:'#6B7280', marginBottom:8 }}>The best AI tools for vibe coding, building and shipping faster.</p>
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  {['#60A5FA','#34D399','#A78BFA'].map((c,i) => (
                    <div key={i} style={{ width:20, height:20, borderRadius:999, background:c, border:'2px solid #fff', marginLeft: i===0?0:-6 }}/>
                  ))}
                  <div style={{ width:20, height:20, borderRadius:999, background:'#E5E7EB', border:'2px solid #fff', marginLeft:-6, fontSize:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#6B7280', fontWeight:700 }}>+2K</div>
                  <span style={{ fontSize:12, color:'#9CA3AF', marginLeft:6 }}>2,341 products</span>
                </div>
              </div>
              <div style={{ marginLeft:16, textAlign:'center', flexShrink:0 }}>
                <div style={{ background:'#fff', borderRadius:12, padding:12, boxShadow:'0 2px 8px rgba(0,0,0,0.06)', border:'1px solid #FED7AA', marginBottom:8 }}>
                  <div style={{ fontSize:18, fontFamily:'monospace', color:'#374151', marginBottom:4 }}>{'</>'}</div>
                  <div style={{ width:80, height:4, background:'#FECACA', borderRadius:4, marginBottom:4 }}/>
                  <div style={{ width:60, height:4, background:'#FED7AA', borderRadius:4 }}/>
                </div>
                <button style={{ background:'#EF4444', color:'#fff', fontSize:11.5, padding:'7px 14px', borderRadius:999, border:'none', cursor:'pointer', fontWeight:600 }}>
                  Explore Collection →
                </button>
              </div>
            </section>

            {/* POPULAR RIGHT NOW */}
            <div style={{ display:'flex', gap:10, overflowX:'auto', paddingBottom:8, marginBottom:20 }}>
              {popularNow.map(p => (
                <div key={p.name} style={{ display:'flex', alignItems:'center', gap:8, border:'1px solid #F3F4F6', borderRadius:12, padding:'8px 12px', flexShrink:0, cursor:'pointer', background:'#fff' }}>
                  <CompanyLogo name={p.name} size={32}/>
                  <div>
                    <p style={{ fontSize:12, fontWeight:600, color:'#111827', lineHeight:1.3 }}>{p.name}</p>
                    <p style={{ fontSize:11, color:'#9CA3AF' }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CATEGORY TABS */}
            <div style={{ display:'flex', gap:2, borderBottom:'1px solid #F3F4F6', marginBottom:16, overflowX:'auto' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  fontSize:13, padding:'0 12px 12px', cursor:'pointer', border:'none', background:'transparent', whiteSpace:'nowrap', flexShrink:0,
                  color: activeCategory===cat ? '#111827' : '#9CA3AF',
                  fontWeight: activeCategory===cat ? 700 : 400,
                  borderBottom: activeCategory===cat ? '2px solid #EF4444' : '2px solid transparent',
                  transition:'all 0.15s',
                }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* TABS ROW */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <div style={{ display:'flex', gap:8 }}>
                {['Most Popular','Newest'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    fontSize:12, display:'flex', alignItems:'center', gap:4, padding:'6px 12px', borderRadius:999, cursor:'pointer', fontWeight: activeTab===tab ? 700 : 400,
                    color: activeTab===tab ? '#EF4444' : '#9CA3AF',
                    background: activeTab===tab ? '#FEF2F2' : 'transparent',
                    border: activeTab===tab ? '1px solid #FECACA' : '1px solid transparent',
                    transition:'all 0.15s',
                  }}>
                    {tab==='Most Popular'?'🔥':'✨'} {tab}
                  </button>
                ))}
              </div>
              <span style={{ fontSize:12, color:'#9CA3AF' }}>20,458 products &nbsp;
                <span style={{ color:'#374151', fontWeight:600 }}>Sort by: Popular ↓</span>
              </span>
            </div>

            {/* COMPANY LIST */}
            <div>
              {companies.map((company: any) => {
                const tl = trendingLabels[company.name] || { label:'Trending', bg:'#FFF7ED', color:'#F97316' }
                return (
                  <div key={company.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 8px', borderBottom:'1px solid #F9FAFB', cursor:'pointer', borderRadius:12, transition:'background 0.1s' }}
                    onMouseEnter={e => (e.currentTarget.style.background='#F9FAFB')}
                    onMouseLeave={e => (e.currentTarget.style.background='transparent')}>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <CompanyLogo name={company.name} size={44}/>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                          <span style={{ fontWeight:700, fontSize:14, color:'#111827' }}>{company.name}</span>
                          <span style={{ fontSize:11, padding:'2px 8px', borderRadius:999, fontWeight:600, background: tl.bg, color: tl.color }}>
                            🔥 {tl.label}
                          </span>
                        </div>
                        <p style={{ fontSize:12.5, color:'#6B7280', marginBottom:6 }}>{company.description}</p>
                        <div style={{ display:'flex', gap:6 }}>
                          <span style={{ fontSize:11, background:'#F3F4F6', color:'#6B7280', padding:'2px 8px', borderRadius:6 }}>{company.category}</span>
                          <span style={{ fontSize:11, background:'#F3F4F6', color:'#6B7280', padding:'2px 8px', borderRadius:6 }}>{company.stage}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:16, color:'#9CA3AF', fontSize:13, flexShrink:0 }}>
                      <span>🤍 {fakeLikes[company.name]||'1.2K'}</span>
                      <span>💬 {fakeComments[company.name]||'42'}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <button style={{ width:'100%', marginTop:20, padding:'12px 0', border:'1px solid #E5E7EB', borderRadius:12, fontSize:13, color:'#6B7280', background:'#fff', cursor:'pointer', fontWeight:500 }}>
              Load more products ↓
            </button>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside style={{ width:240, padding:'24px 16px', borderLeft:'1px solid #F3F4F6', flexShrink:0 }}>
            {/* Product of the Day */}
            <div style={{ marginBottom:24 }}>
              <p style={{ fontSize:12, fontWeight:700, color:'#111827', marginBottom:12 }}>🏆 Product of the Day</p>
              <div style={{ border:'1px solid #F3F4F6', borderRadius:12, padding:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <div style={{ width:36, height:36, background:'#111827', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700 }}>C</div>
                  <div>
                    <p style={{ fontSize:13, fontWeight:700, color:'#111827' }}>Cursor</p>
                    <p style={{ fontSize:11, color:'#9CA3AF' }}>AI-first code editor</p>
                  </div>
                </div>
                <button style={{ width:'100%', background:'#EF4444', color:'#fff', fontSize:12, padding:'8px 0', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600 }}>View Product</button>
              </div>
            </div>

            {/* Trending Searches */}
            <div style={{ marginBottom:24 }}>
              <p style={{ fontSize:12, fontWeight:700, color:'#111827', marginBottom:10 }}>📈 Trending Searches</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {trendingSearches.map(t => (
                  <span key={t} style={{ fontSize:11.5, border:'1px solid #E5E7EB', borderRadius:999, padding:'4px 10px', color:'#374151', cursor:'pointer', background:'#fff' }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div style={{ border:'1px solid #FECACA', borderRadius:12, padding:14, background:'#FEF2F2' }}>
              <p style={{ fontSize:12.5, fontWeight:700, color:'#111827', marginBottom:4 }}>✉️ Stay ahead in AI</p>
              <p style={{ fontSize:11.5, color:'#6B7280', marginBottom:10, lineHeight:1.5 }}>Get weekly updates on new tools and trends.</p>
              <input type="email" placeholder="Enter your email"
                style={{ width:'100%', border:'1px solid #E5E7EB', borderRadius:8, padding:'7px 10px', fontSize:12, marginBottom:8, outline:'none', boxSizing:'border-box', background:'#fff', color:'#111827' }}/>
              <button style={{ width:'100%', background:'#EF4444', color:'#fff', fontSize:12, padding:'8px 0', borderRadius:8, border:'none', cursor:'pointer', fontWeight:600 }}>Subscribe</button>
            </div>

            {/* Footer */}
            <div style={{ marginTop:20, paddingTop:16, borderTop:'1px solid #F3F4F6' }}>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {['About','Advertise','API','Newsletter','Blog','Privacy','Terms','Contact'].map(l => (
                  <a key={l} href="#" style={{ fontSize:11, color:'#9CA3AF', textDecoration:'none' }}>{l}</a>
                ))}
              </div>
              <p style={{ fontSize:11, color:'#D1D5DB', marginTop:8 }}>© 2024 GraphOne. All rights reserved.</p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}