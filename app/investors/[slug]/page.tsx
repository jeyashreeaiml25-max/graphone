'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function InvestorProfile() {
  const params = useParams()
  const [investor, setInvestor] = useState<any>(null)

  useEffect(() => {
    fetch(`/api/investors/${params.slug}`)
      .then(r => r.json())
      .then(setInvestor)
  }, [params.slug])

  if (!investor) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', fontFamily:'Inter,sans-serif' }}>
      <p style={{ color:'#6B7280' }}>Loading...</p>
    </div>
  )

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:'#fff', color:'#111827', minHeight:'100vh' }}>

      {/* TOP NAVBAR */}
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
          <svg style={{ width:14, height:14, marginRight:8 }} fill="none" stroke="#9CA3AF" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Search startups, products, investors, jobs and news"
            style={{ flex:1, outline:'none', fontSize:12.5, color:'#6B7280', background:'transparent', border:'none' }}/>
        </div>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:32, height:32, borderRadius:999, background:'linear-gradient(135deg,#F97316,#EC4899)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700 }}>A</div>
        </div>
      </header>

      {/* BODY */}
      <div style={{ display:'flex', paddingTop:56 }}>

        {/* LEFT SIDEBAR */}
        <aside style={{ width:200, borderRight:'1px solid #F3F4F6', padding:'20px 12px', position:'fixed', top:56, height:'calc(100vh - 56px)', background:'#fff', zIndex:40 }}>
          <nav style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {[
              { name:'Home',        icon:'🏠', href:'/'          },
              { name:'AI Startups', icon:'🚀', href:'/startups'  },
              { name:'AI Products', icon:'📦', href:'/products'  },
              { name:'Investors',   icon:'👥', href:'/investors', active:true },
              { name:'Jobs',        icon:'💼', href:'/jobs'      },
              { name:'News',        icon:'📰', href:'/news'      },
            ].map(item => (
              <Link key={item.name} href={item.href} style={{
                display:'flex', alignItems:'center', gap:10, fontSize:13, padding:'8px 12px', borderRadius:8, textDecoration:'none',
                color: item.active ? '#EF4444' : '#6B7280',
                background: item.active ? '#FEF2F2' : 'transparent',
                fontWeight: item.active ? 600 : 400,
              }}>
                <span>{item.icon}</span>{item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* MAIN */}
        <main style={{ marginLeft:200, flex:1, padding:'24px 32px', maxWidth:1100 }}>

          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#9CA3AF', marginBottom:16 }}>
            <Link href="/" style={{ color:'#9CA3AF', textDecoration:'none' }}>Home</Link>
            <span>›</span>
            <Link href="/investors" style={{ color:'#9CA3AF', textDecoration:'none' }}>Investors</Link>
            <span>›</span>
            <span style={{ color:'#111827' }}>{investor.name}</span>
          </div>

          {/* PROFILE HEADER */}
          <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:24, marginBottom:20, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div style={{ display:'flex', gap:20, alignItems:'flex-start' }}>
              {/* Logo */}
              <div style={{ width:80, height:80, background:'#F0FDF4', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid #DCFCE7', flexShrink:0 }}>
                <span style={{ fontSize:32, fontWeight:900, color:'#16A34A' }}>{investor.name[0]}</span>
              </div>
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                  <h1 style={{ fontSize:26, fontWeight:800, color:'#111827' }}>{investor.name}</h1>
                  <span style={{ fontSize:11, background:'#DBEAFE', color:'#1D4ED8', padding:'2px 8px', borderRadius:999, fontWeight:600 }}>✓ Verified Investor</span>
                </div>
                <p style={{ fontSize:13, color:'#6B7280', marginBottom:8 }}>{investor.description}</p>
                <div style={{ display:'flex', alignItems:'center', gap:12, fontSize:12, color:'#9CA3AF', marginBottom:10 }}>
                  <span>📍 {investor.location}</span>
                  <span>📅 Founded in {investor.founded}</span>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  {['VC','Growth Equity','Private Equity'].map(tag => (
                    <span key={tag} style={{ fontSize:11, border:'1px solid #E5E7EB', borderRadius:999, padding:'3px 10px', color:'#374151' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key People */}
            <div>
              <p style={{ fontSize:12, color:'#9CA3AF', marginBottom:10, fontWeight:600 }}>Key people</p>
              <div style={{ display:'flex', gap:12 }}>
                {['Roelof Botha','Pat Grady','Doug Leone','Alfred Lin'].map((person, i) => (
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ width:44, height:44, borderRadius:999, background:`hsl(${i*60},60%,70%)`, marginBottom:4, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:14 }}>
                      {person[0]}
                    </div>
                    <p style={{ fontSize:10, color:'#111827', fontWeight:600, maxWidth:60 }}>{person.split(' ')[0]}</p>
                    <p style={{ fontSize:9, color:'#9CA3AF' }}>Partner</p>
                  </div>
                ))}
              </div>
              <a href="#" style={{ fontSize:11, color:'#EF4444', textDecoration:'none', display:'block', marginTop:8 }}>View all team members →</a>
            </div>
          </div>

          {/* STATS ROW */}
          <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20, marginBottom:20, display:'flex', gap:0, justifyContent:'space-around' }}>
            {[
              { label:'Deals Last 90 Days', value:'+12', color:'#EF4444' },
              { label:'Lead Investments',   value:'+4',  color:'#10B981' },
              { label:'Most Active Stage',  value:'Series A', color:'#3B82F6' },
              { label:'Top Partner',        value:'a16z',     color:'#8B5CF6' },
              { label:'Top Focus Area',     value:'Agents',   color:'#F59E0B' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign:'center', padding:'0 16px', borderRight: i<4 ? '1px solid #F3F4F6' : 'none' }}>
                <p style={{ fontSize:20, fontWeight:800, color: stat.color }}>{stat.value}</p>
                <p style={{ fontSize:11, color:'#9CA3AF', marginTop:2 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* TWO COLUMN */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>

            {/* Investment Thesis */}
            <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20 }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:'#111827', marginBottom:12 }}>Investment Thesis</h3>
              <div style={{ fontSize:32, color:'#E5E7EB', marginBottom:8 }}>"</div>
              <p style={{ fontSize:12.5, color:'#6B7280', lineHeight:1.7, marginBottom:12 }}>
                {investor.name} partners with visionary founders building category-defining companies. Our focus is on technology and innovation that creates long-term impact and shapes the future.
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:12 }}>
                {['AI Agents','AI Infrastructure','Developer Tools','Healthcare AI','Security AI'].map(tag => (
                  <span key={tag} style={{ fontSize:11, background:'#F3F4F6', color:'#6B7280', padding:'3px 8px', borderRadius:6 }}>{tag}</span>
                ))}
              </div>
              <p style={{ fontSize:11, color:'#9CA3AF', fontWeight:600, marginBottom:6 }}>Preferred Stages</p>
              <div style={{ display:'flex', gap:6 }}>
                {['Seed','Series A','Series B','Growth'].map(s => (
                  <span key={s} style={{ fontSize:11, border:'1px solid #E5E7EB', borderRadius:6, padding:'2px 8px', color:'#374151' }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Portfolio Concentration */}
            <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20 }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:'#111827', marginBottom:12 }}>Portfolio Concentration</h3>
              {/* Simple donut chart simulation */}
              <div style={{ display:'flex', alignItems:'center', gap:20 }}>
                <div style={{ width:120, height:120, borderRadius:999, background:'conic-gradient(#EF4444 0% 35%, #3B82F6 35% 57%, #10B981 57% 75%, #F59E0B 75% 90%, #E5E7EB 90% 100%)', position:'relative', flexShrink:0 }}>
                  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:60, height:60, background:'#fff', borderRadius:999 }}/>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {[
                    { label:'AI Infrastructure', pct:'35%', color:'#EF4444' },
                    { label:'AI Agents',          pct:'22%', color:'#3B82F6' },
                    { label:'AI Coding',          pct:'18%', color:'#10B981' },
                    { label:'Healthcare AI',      pct:'15%', color:'#F59E0B' },
                    { label:'Other',              pct:'10%', color:'#E5E7EB' },
                  ].map(item => (
                    <div key={item.label} style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <div style={{ width:10, height:10, borderRadius:999, background:item.color, flexShrink:0 }}/>
                      <span style={{ fontSize:11, color:'#374151' }}>{item.label}</span>
                      <span style={{ fontSize:11, color:'#9CA3AF', marginLeft:'auto' }}>{item.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RECENT INVESTMENTS */}
          <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20, marginBottom:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:'#111827' }}>Recent Investments</h3>
              <a href="#" style={{ fontSize:12, color:'#EF4444', textDecoration:'none' }}>View all investments →</a>
            </div>
            <div style={{ display:'flex', gap:12, overflowX:'auto' }}>
              {(investor.investments || []).slice(0,5).map((inv: any, i: number) => (
                <div key={i} style={{ flexShrink:0, width:160, background:'#111827', borderRadius:12, padding:16, color:'#fff' }}>
                  <div style={{ width:36, height:36, background:'#374151', borderRadius:8, marginBottom:10, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14 }}>
                    {inv.company?.name?.[0] || 'C'}
                  </div>
                  <p style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{inv.company?.name || 'Company'}</p>
                  <p style={{ fontSize:11, color:'#9CA3AF', marginBottom:8 }}>{inv.stage}</p>
                  <p style={{ fontSize:16, fontWeight:800, color:'#EF4444', marginBottom:2 }}>{inv.amount || '$50M'}</p>
                  <p style={{ fontSize:10, color:'#6B7280' }}>{new Date(inv.date).toLocaleDateString('en-US',{month:'short',year:'numeric'})}</p>
                  {inv.isLead && <p style={{ fontSize:10, color:'#9CA3AF', marginTop:4 }}>Lead Investor</p>}
                </div>
              ))}
              {/* Extra static cards */}
              {[
                { name:'Harvey',    stage:'Series D', amount:'$150M', month:'May 2024' },
                { name:'Luma AI',   stage:'Series C', amount:'$90M',  month:'Apr 2024' },
                { name:'Mistral AI',stage:'Series B', amount:'$60M',  month:'Mar 2024' },
              ].map((c,i) => (
                <div key={`static-${i}`} style={{ flexShrink:0, width:160, background:'#111827', borderRadius:12, padding:16, color:'#fff' }}>
                  <div style={{ width:36, height:36, background:'#374151', borderRadius:8, marginBottom:10, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14 }}>
                    {c.name[0]}
                  </div>
                  <p style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{c.name}</p>
                  <p style={{ fontSize:11, color:'#9CA3AF', marginBottom:8 }}>{c.stage}</p>
                  <p style={{ fontSize:16, fontWeight:800, color:'#EF4444', marginBottom:2 }}>{c.amount}</p>
                  <p style={{ fontSize:10, color:'#6B7280' }}>{c.month}</p>
                  <p style={{ fontSize:10, color:'#9CA3AF', marginTop:4 }}>Lead Investor</p>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM STATS GRID */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, marginBottom:20 }}>

            {/* Investment Velocity */}
            <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20 }}>
              <h3 style={{ fontSize:13, fontWeight:700, color:'#111827', marginBottom:12 }}>📈 Investment Velocity</h3>
              {[['2022','14'],['2023','21'],['2024','36'],['2025','48'],['2026','31 YTD']].map(([year,deals]) => (
                <div key={year} style={{ display:'flex', justifyContent:'space-between', fontSize:12, color:'#6B7280', marginBottom:6 }}>
                  <span>{year}</span>
                  <span style={{ fontWeight:600, color:'#111827' }}>{deals} AI Deals</span>
                </div>
              ))}
            </div>

            {/* Capital Flow */}
            <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20 }}>
              <h3 style={{ fontSize:13, fontWeight:700, color:'#111827', marginBottom:12 }}>📈 Capital Flow</h3>
              <p style={{ fontSize:11, color:'#9CA3AF', marginBottom:8 }}>Increasing Capital</p>
              {['AI Agents','AI Coding','AI Infrastructure'].map(item => (
                <div key={item} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#16A34A', marginBottom:4 }}>
                  <span>↗</span><span>{item}</span>
                </div>
              ))}
              <p style={{ fontSize:11, color:'#9CA3AF', margin:'10px 0 8px' }}>Decreasing Capital</p>
              {['Enterprise AI','Traditional SaaS','Consumer Apps'].map(item => (
                <div key={item} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#EF4444', marginBottom:4 }}>
                  <span>↘</span><span>{item}</span>
                </div>
              ))}
            </div>

            {/* Stage Evolution */}
            <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20 }}>
              <h3 style={{ fontSize:13, fontWeight:700, color:'#111827', marginBottom:12 }}>📈 Stage Evolution</h3>
              {[['2021','Seed Heavy'],['2022','Seed + Series A'],['2023','Series A Focus'],['2024','Series A + Growth'],['2025','Growth Equity Expansion']].map(([year,stage]) => (
                <div key={year} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#6B7280', marginBottom:6 }}>
                  <span style={{ width:6, height:6, background:'#EF4444', borderRadius:999, flexShrink:0 }}/>
                  <span style={{ color:'#9CA3AF' }}>{year}</span>
                  <span style={{ color:'#374151' }}>{stage}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FOLLOW ON STRENGTH */}
          <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20, marginBottom:20 }}>
            <h3 style={{ fontSize:13, fontWeight:700, color:'#111827', marginBottom:16 }}>📈 Follow-On Strength</h3>
            <div style={{ display:'flex', gap:32 }}>
              {[
                { value:'82%', label:'Raised Next Round' },
                { value:'14',  label:'Months Average Time' },
                { value:'3.8x',label:'Median Funding Growth' },
                { value:'68%', label:'Raised Series B+' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign:'center' }}>
                  <p style={{ fontSize:22, fontWeight:800, color:'#111827' }}>{stat.value}</p>
                  <p style={{ fontSize:11, color:'#9CA3AF' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CO-INVESTOR NETWORK */}
          <div style={{ border:'1px solid #F3F4F6', borderRadius:16, padding:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <h3 style={{ fontSize:13, fontWeight:700, color:'#111827' }}>🤝 Co-Investor Network</h3>
              <a href="#" style={{ fontSize:12, color:'#EF4444', textDecoration:'none' }}>View all co-investors →</a>
            </div>
            <p style={{ fontSize:11, color:'#9CA3AF', marginBottom:10 }}>Most Frequent Co-Investors</p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {['a16z','Lightspeed','Accel','Index','General Catalyst','Kleiner Perkins'].map(name => (
                <div key={name} style={{ fontSize:13, fontWeight:700, color:'#374151', padding:'6px 14px', border:'1px solid #E5E7EB', borderRadius:8 }}>{name}</div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}