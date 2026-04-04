export const dynamic = 'force-dynamic';

import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getSubdomain } from '@/lib/getSubdomain';
import { supabase } from '@/lib/supabase';

export default async function HomePage() {
  const headersList = await headers();
  const host = headersList.get('host');
  const subdomain = getSubdomain(host);

  if (subdomain) {
    const { data: site, error: siteError } = await supabase
      .from('sites')
      .select('*')
      .eq('subdomain', subdomain)
      .single();

    if (siteError || !site) {
      notFound();
    }

    return (
      <div>
        <h1>{site.name}</h1>
        <p>Welcome to {site.name}</p>
        <Link href='/services'>View Services</Link>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: '#FAFCF7',
        color: '#1E2A14',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --orange: #F7941D; --orange-light: #FEF0DC; --orange-dark: #E07A0A;
          --green: #5BA614; --green-light: #EEF7E0; --green-dark: #3d7a0a;
          --blue: #3AABDB; --blue-light: #E6F6FC;
          --dark: #111A0A; --text: #1E2A14; --muted: #6B7A60;
          --border: #E4EDD8; --bg: #FAFCF7; --white: #ffffff;
        }
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(91,166,20,0.12); height: 68px; display: flex; align-items: center; padding: 0 6%; }
        .nav-inner { width: 100%; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-wordmark { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 17px; color: var(--dark); }
        .nav-wordmark span { color: var(--green); }
        .nav-links { display: flex; align-items: center; gap: 26px; }
        .nav-links a { color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 500; }
        .nav-links a:hover { color: var(--orange); }
        .nav-cta { background: var(--orange); color: white; padding: 9px 20px; border-radius: 7px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px; border: none; cursor: pointer; text-decoration: none; }
        .hero { min-height: 100vh; position: relative; display: flex; align-items: center; padding: 100px 6% 80px; overflow: hidden; }
        .hero-overlay { position: absolute; inset: 0; background: linear-gradient(105deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.40) 60%, rgba(255,255,255,0.05) 100%); z-index: 1; }
        .hero-content { position: relative; z-index: 2; max-width: 580px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: var(--green-light); border: 1px solid rgba(91,166,20,0.25); border-radius: 20px; padding: 5px 14px; margin-bottom: 24px; }
        .hero-badge-dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse 2s infinite; flex-shrink: 0; }
        .hero-badge-text { font-size: 11.5px; color: var(--green-dark); font-weight: 600; letter-spacing: 0.4px; }
        .hero h1 { font-family: 'Montserrat', sans-serif; font-size: clamp(32px, 4.2vw, 56px); font-weight: 900; line-height: 1.1; color: var(--dark); margin-bottom: 18px; }
        .ao { color: var(--orange); } .ag { color: var(--green); }
        .hero-sub { font-size: clamp(15px, 1.6vw, 17px); color: var(--muted); line-height: 1.75; margin-bottom: 34px; max-width: 460px; }
        .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
        .btn-primary { background: linear-gradient(135deg, var(--orange), var(--orange-dark)); color: white; padding: 13px 28px; border-radius: 8px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px; border: none; cursor: pointer; text-decoration: none; display: inline-block; }
        .btn-outline { background: rgba(255,255,255,0.8); color: var(--green-dark); padding: 13px 28px; border-radius: 8px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px; border: 2px solid var(--green); cursor: pointer; text-decoration: none; display: inline-block; }
        .hero-stats { display: flex; gap: 32px; padding-top: 24px; border-top: 1px solid rgba(91,166,20,0.2); }
        .stat-val { font-family: 'Montserrat', sans-serif; font-size: 24px; font-weight: 900; color: var(--orange); }
        .stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; }
        .hero-float { position: absolute; right: 6%; top: 50%; transform: translateY(-50%); z-index: 3; width: min(360px, 36vw); display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .float-card { background: rgba(255,255,255,0.82); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.9); border-radius: 14px; padding: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); animation: floatA 4s ease-in-out infinite; }
        .float-card:nth-child(2), .float-card:nth-child(4) { animation: floatB 4s ease-in-out infinite 0.6s; }
        .float-icon { font-size: 22px; margin-bottom: 8px; }
        .float-name { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 12px; color: var(--dark); }
        .float-tag { font-size: 10px; color: var(--muted); margin-top: 2px; }
        .float-pill { display: inline-block; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 10px; margin-top: 7px; font-family: 'Montserrat', sans-serif; }
        .pill-o { background: var(--orange-light); color: var(--orange-dark); }
        .pill-g { background: var(--green-light); color: var(--green-dark); }
        .pill-b { background: var(--blue-light); color: #1a7fa8; }
        .section { padding: 72px 6%; }
        .directory { background: white; padding: 72px 6%; }
        .how { background: var(--bg); padding: 72px 6%; }
        .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--orange); margin-bottom: 8px; }
        .heading { font-family: 'Montserrat', sans-serif; font-size: clamp(24px, 3vw, 36px); font-weight: 900; color: var(--dark); line-height: 1.15; margin-bottom: 10px; }
        .heading span { color: var(--green); }
        .subtext { font-size: 15px; color: var(--muted); max-width: 460px; line-height: 1.7; margin-bottom: 40px; }
        .cats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(138px, 1fr)); gap: 12px; }
        .cat-card { background: white; border: 1.5px solid var(--border); border-radius: 12px; padding: 20px 14px; text-align: center; cursor: pointer; transition: all 0.22s; }
        .cat-card:hover { border-color: var(--orange); box-shadow: 0 6px 20px rgba(247,148,29,0.1); transform: translateY(-2px); }
        .cat-emoji { font-size: 26px; margin-bottom: 8px; }
        .cat-name { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 12.5px; color: var(--dark); }
        .cat-sub { font-size: 10.5px; color: var(--muted); margin-top: 3px; }
        .dir-controls { display: flex; gap: 10px; margin-bottom: 32px; flex-wrap: wrap; }
        .search-wrap { flex: 1; min-width: 200px; position: relative; }
        .search-wrap input { width: 100%; padding: 11px 16px 11px 40px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 14px; background: var(--bg); outline: none; }
        .search-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--muted); }
        .filter-btn { padding: 10px 16px; border: 1.5px solid var(--border); border-radius: 8px; background: white; font-size: 13px; color: var(--muted); cursor: pointer; font-weight: 500; }
        .filter-btn.active { border-color: var(--orange); color: var(--orange); background: var(--orange-light); }
        .biz-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(265px, 1fr)); gap: 20px; }
        .biz-card { border: 1.5px solid var(--border); border-radius: 14px; overflow: hidden; background: white; transition: all 0.22s; cursor: pointer; }
        .biz-card:hover { border-color: var(--orange); box-shadow: 0 8px 28px rgba(0,0,0,0.08); transform: translateY(-3px); }
        .biz-img { height: 148px; position: relative; display: flex; align-items: center; justify-content: center; font-size: 42px; }
        .bi1{background:linear-gradient(135deg,#dff5c8,#b8e87a)} .bi2{background:linear-gradient(135deg,#d0eeff,#9dd4f5)} .bi3{background:linear-gradient(135deg,#ffe8c8,#ffc87a)} .bi4{background:linear-gradient(135deg,#eed8ff,#d0a8f8)} .bi5{background:linear-gradient(135deg,#ffd8d8,#f8a0a0)} .bi6{background:linear-gradient(135deg,#d8fff0,#80f0c0)}
        .biz-tag { position: absolute; top: 10px; left: 10px; font-size: 9.5px; font-weight: 700; padding: 3px 9px; border-radius: 5px; font-family: 'Montserrat', sans-serif; color: white; }
        .bt-o{background:var(--orange)} .bt-g{background:var(--green)} .bt-b{background:var(--blue)} .bt-p{background:#9B59B6} .bt-r{background:#E74C3C} .bt-t{background:#1ABC9C}
        .biz-body { padding: 14px; }
        .biz-name { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; color: var(--dark); margin-bottom: 4px; }
        .biz-desc { font-size: 12.5px; color: var(--muted); line-height: 1.55; margin-bottom: 10px; }
        .biz-foot { display: flex; justify-content: space-between; align-items: center; }
        .biz-loc { font-size: 11px; color: var(--muted); }
        .biz-link { font-size: 11.5px; font-weight: 700; color: var(--green); font-family: 'Montserrat', sans-serif; text-decoration: none; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 22px; margin-top: 40px; }
        .step-card { background: white; border: 1.5px solid var(--border); border-radius: 14px; padding: 28px 22px; transition: all 0.22s; }
        .step-card:hover { border-color: var(--green); box-shadow: 0 6px 22px rgba(91,166,20,0.1); transform: translateY(-2px); }
        .step-num { font-family: 'Montserrat', sans-serif; font-size: 36px; font-weight: 900; color: var(--orange-light); line-height: 1; margin-bottom: 14px; }
        .step-icon { width: 42px; height: 42px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 14px; }
        .si-o{background:var(--orange-light)} .si-g{background:var(--green-light)} .si-b{background:var(--blue-light)}
        .step-title { font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 15px; color: var(--dark); margin-bottom: 8px; }
        .step-desc { font-size: 13px; color: var(--muted); line-height: 1.65; }
        .cta-section { padding: 80px 6%; background: linear-gradient(135deg, #0d1f04 0%, #1a3a08 100%); text-align: center; position: relative; overflow: hidden; }
        .cta-glow { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.18; }
        .cta-section h2 { font-family: 'Montserrat', sans-serif; font-size: clamp(26px, 3.5vw, 40px); font-weight: 900; color: white; margin-bottom: 14px; position: relative; z-index: 2; }
        .cta-section p { font-size: 16px; color: rgba(255,255,255,0.6); margin-bottom: 32px; max-width: 460px; margin-left: auto; margin-right: auto; line-height: 1.7; position: relative; z-index: 2; }
        .btn-white { background: white; color: var(--orange-dark); padding: 14px 34px; border-radius: 8px; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; border: none; cursor: pointer; position: relative; z-index: 2; text-decoration: none; display: inline-block; }
        footer { background: var(--dark); padding: 52px 6% 28px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 36px; margin-bottom: 40px; }
        .footer-logo { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
        .footer-logo-text { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 17px; color: white; }
        .footer-logo-text em { color: var(--green); font-style: normal; }
        .footer-about p { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.7; margin-bottom: 12px; max-width: 240px; }
        .footer-slogan { font-size: 10.5px; color: var(--orange); font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; }
        .footer-col h4 { font-family: 'Montserrat', sans-serif; font-size: 10.5px; font-weight: 700; color: rgba(255,255,255,0.45); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 16px; }
        .footer-col a { display: block; font-size: 13px; color: rgba(255,255,255,0.38); text-decoration: none; margin-bottom: 9px; }
        .footer-col a:hover { color: var(--green); }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .footer-bottom p { font-size: 12px; color: rgba(255,255,255,0.2); }
        .footer-bottom span { color: var(--orange); }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      `}</style>

      {/* NAV */}
      <nav>
        <div className='nav-inner'>
          <Link className='nav-brand' href='/'>
            <Image
              src='/logos/logo.jpeg'
              alt='BarimaVenture Logo'
              width={44}
              height={44}
              style={{ borderRadius: '8px', objectFit: 'contain' }}
            />
            <div className='nav-wordmark'>
              Barima<span>Venture</span>
            </div>
          </Link>
          <div className='nav-links'>
            <a href='#directory'>Directory</a>
            <a href='#how'>How It Works</a>
            <a href='#categories'>Categories</a>
            <Link href='/create' className='nav-cta'>
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className='hero'>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src='/images/hero-platform.jpeg'
            alt='Hero background'
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
        </div>
        <div className='hero-overlay' />
        <div className='hero-content'>
          <div className='hero-badge'>
            <div className='hero-badge-dot' />
            <span className='hero-badge-text'>
              NOW LIVE — Join the platform
            </span>
          </div>
          <h1>
            Build Your <span className='ao'>Presence,</span>
            <br />
            Grow Your <span className='ag'>Business.</span>
          </h1>
          <p className='hero-sub'>
            The simplest way to get your business online. No coding, no
            confusion — just your business, looking professional, live in
            minutes.
          </p>
          <div className='hero-actions'>
            <Link href='/create' className='btn-primary'>
              Create Your Website Free
            </Link>
            <a href='#directory' className='btn-outline'>
              Browse Directory
            </a>
          </div>
          <div className='hero-stats'>
            <div>
              <div className='stat-val'>5min</div>
              <div className='stat-label'>To go live</div>
            </div>
            <div>
              <div className='stat-val'>100%</div>
              <div className='stat-label'>Free to start</div>
            </div>
            <div>
              <div className='stat-val'>20+</div>
              <div className='stat-label'>Businesses live</div>
            </div>
          </div>
        </div>
        <div className='hero-float'>
          <div className='float-card'>
            <div className='float-icon'>🏠</div>
            <div className='float-name'>Cozy Stays</div>
            <div className='float-tag'>Short-term Rentals</div>
            <div className='float-pill pill-b'>AIRBNB</div>
          </div>
          <div className='float-card'>
            <div className='float-icon'>🍽️</div>
            <div className='float-name'>Spice & Soul</div>
            <div className='float-tag'>Food & Catering</div>
            <div className='float-pill pill-o'>FOOD</div>
          </div>
          <div className='float-card'>
            <div className='float-icon'>⚡</div>
            <div className='float-name'>ProElec Services</div>
            <div className='float-tag'>Electrical Works</div>
            <div className='float-pill pill-g'>SERVICES</div>
          </div>
          <div className='float-card'>
            <div className='float-icon'>🚚</div>
            <div className='float-name'>Swift Haulage</div>
            <div className='float-tag'>Transport</div>
            <div className='float-pill pill-g'>TRUCKING</div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className='section' id='categories'>
        <div className='eyebrow'>Explore</div>
        <div className='heading'>
          Browse by <span>Category</span>
        </div>
        <p className='subtext'>
          Every sector. One platform. Find or list any type of business.
        </p>
        <div className='cats-grid'>
          {[
            ['🏗️', 'Rentals', 'Equipment & Tools'],
            ['🏠', 'Airbnb', 'Short-term Stays'],
            ['🍽️', 'Food', 'Restaurants & Catering'],
            ['🔨', 'Construction', 'Builders & Contractors'],
            ['⚡', 'Services', 'Trades & Professionals'],
            ['🚚', 'Trucking', 'Transport & Haulage'],
            ['🛒', 'Retail', 'Shops & Stores'],
            ['💆', 'Beauty', 'Salons & Wellness'],
            ['🌱', 'Agriculture', 'Farms & Produce'],
            ['🔧', 'Auto', 'Mechanics & Repairs'],
            ['🎉', 'Events', 'Planning & Venues'],
            ['💪', 'Health', 'Fitness & Wellness'],
          ].map(([emoji, name, sub]) => (
            <div className='cat-card' key={name}>
              <div className='cat-emoji'>{emoji}</div>
              <div className='cat-name'>{name}</div>
              <div className='cat-sub'>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DIRECTORY */}
      <section className='directory' id='directory'>
        <div className='eyebrow'>Directory</div>
        <div className='heading'>
          Featured <span>Businesses</span>
        </div>
        <p className='subtext'>
          Discover and connect with businesses on the platform.
        </p>
        <div className='dir-controls'>
          <div className='search-wrap'>
            <span className='search-icon'>🔍</span>
            <input
              type='text'
              placeholder='Search businesses, services, locations...'
            />
          </div>
          <button className='filter-btn active'>All</button>
          <button className='filter-btn'>Rentals</button>
          <button className='filter-btn'>Food</button>
          <button className='filter-btn'>Services</button>
        </div>
        <div className='biz-grid'>
          <div className='biz-card'>
            <div className='biz-img bi1'>
              <span>🏠</span>
              <span className='biz-tag bt-b'>AIRBNB</span>
            </div>
            <div className='biz-body'>
              <div className='biz-name'>Cozy Stays</div>
              <div className='biz-desc'>
                Comfortable short-term accommodation. Perfect for business trips
                and family visits.
              </div>
              <div className='biz-foot'>
                <span className='biz-loc'>📍 East Coast</span>
                <a className='biz-link' href='#'>
                  View →
                </a>
              </div>
            </div>
          </div>
          <div className='biz-card'>
            <div className='biz-img bi3'>
              <span>🍽️</span>
              <span className='biz-tag bt-o'>FOOD</span>
            </div>
            <div className='biz-body'>
              <div className='biz-name'>Spice & Soul Kitchen</div>
              <div className='biz-desc'>
                Authentic local catering and food delivery for events, offices
                and daily orders.
              </div>
              <div className='biz-foot'>
                <span className='biz-loc'>📍 West Coast</span>
                <a className='biz-link' href='#'>
                  View →
                </a>
              </div>
            </div>
          </div>
          <div className='biz-card'>
            <div className='biz-img bi2'>
              <span>⚡</span>
              <span className='biz-tag bt-t'>SERVICES</span>
            </div>
            <div className='biz-body'>
              <div className='biz-name'>ProElec Services</div>
              <div className='biz-desc'>
                Licensed electrical installations, repairs and maintenance for
                homes and businesses.
              </div>
              <div className='biz-foot'>
                <span className='biz-loc'>📍 West Bank</span>
                <a className='biz-link' href='#'>
                  View →
                </a>
              </div>
            </div>
          </div>
          <div className='biz-card'>
            <div className='biz-img bi4'>
              <span>💆</span>
              <span className='biz-tag bt-p'>BEAUTY</span>
            </div>
            <div className='biz-body'>
              <div className='biz-name'>Glow Studio</div>
              <div className='biz-desc'>
                Hair, nails, skincare and full beauty services. Walk-ins
                welcome, appointments preferred.
              </div>
              <div className='biz-foot'>
                <span className='biz-loc'>📍 Georgetown</span>
                <a className='biz-link' href='#'>
                  View →
                </a>
              </div>
            </div>
          </div>
          <div className='biz-card'>
            <div className='biz-img bi5'>
              <span>🚚</span>
              <span className='biz-tag bt-r'>TRUCKING</span>
            </div>
            <div className='biz-body'>
              <div className='biz-name'>Swift Haulage Co.</div>
              <div className='biz-desc'>
                Reliable transport and haulage services for construction
                materials and general cargo.
              </div>
              <div className='biz-foot'>
                <span className='biz-loc'>📍 Berbice</span>
                <a className='biz-link' href='#'>
                  View →
                </a>
              </div>
            </div>
          </div>
          <div className='biz-card'>
            <div className='biz-img bi6'>
              <span>🌱</span>
              <span className='biz-tag bt-g'>AGRICULTURE</span>
            </div>
            <div className='biz-body'>
              <div className='biz-name'>Fresh Harvest Farm</div>
              <div className='biz-desc'>
                Fresh vegetables, fruits and farm produce. Weekly delivery
                available across the region.
              </div>
              <div className='biz-foot'>
                <span className='biz-loc'>📍 Essequibo</span>
                <a className='biz-link' href='#'>
                  View →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className='how' id='how'>
        <div className='eyebrow'>Simple Process</div>
        <div className='heading'>
          Up and Running in <span>3 Steps</span>
        </div>
        <p className='subtext'>
          No technical knowledge needed. If you can fill a form, you can build a
          website.
        </p>
        <div className='steps-grid'>
          <div className='step-card'>
            <div className='step-num'>01</div>
            <div className='step-icon si-o'>🔑</div>
            <div className='step-title'>Sign In with Google</div>
            <div className='step-desc'>
              One click to get started. No passwords to remember. Your Google
              account is all you need.
            </div>
          </div>
          <div className='step-card'>
            <div className='step-num'>02</div>
            <div className='step-icon si-g'>🏢</div>
            <div className='step-title'>Add Your Business</div>
            <div className='step-desc'>
              Enter your business name, category, services and contact details.
              Takes under 5 minutes.
            </div>
          </div>
          <div className='step-card'>
            <div className='step-num'>03</div>
            <div className='step-icon si-b'>🚀</div>
            <div className='step-title'>Go Live Instantly</div>
            <div className='step-desc'>
              Your professional website is live immediately. Share your unique
              link on WhatsApp and social media.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='cta-section'>
        <div
          className='cta-glow'
          style={{
            width: '450px',
            height: '450px',
            background: '#F7941D',
            top: '-150px',
            left: '15%',
          }}
        />
        <div
          className='cta-glow'
          style={{
            width: '350px',
            height: '350px',
            background: '#5BA614',
            bottom: '-100px',
            right: '15%',
          }}
        />
        <h2>Ready to Go Online?</h2>
        <p>
          Join the platform. Free to start. Live in minutes. No middleman
          required.
        </p>
        <Link href='/create' className='btn-white'>
          Create Your Website Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer>
        <div className='footer-grid'>
          <div className='footer-about'>
            <div className='footer-logo'>
              <Image
                src='/logos/logo.jpeg'
                alt='BarimaVenture'
                width={36}
                height={36}
                style={{ borderRadius: '7px', objectFit: 'contain' }}
              />
              <span className='footer-logo-text'>
                Barima<em>Venture</em>
              </span>
            </div>
            <p>
              Empowering businesses to go online simply, quickly and affordably.
              Every sector. One platform.
            </p>
            <div className='footer-slogan'>
              Innovation in Motion. Built on Trust.
            </div>
          </div>
          <div className='footer-col'>
            <h4>Platform</h4>
            <Link href='/create'>Create a Website</Link>
            <a href='#directory'>Browse Directory</a>
            <a href='#how'>How It Works</a>
            <a href='#categories'>Categories</a>
          </div>
          <div className='footer-col'>
            <h4>Categories</h4>
            <a href='#categories'>Rentals</a>
            <a href='#categories'>Food & Catering</a>
            <a href='#categories'>Services</a>
            <a href='#categories'>Airbnb & Stays</a>
            <a href='#categories'>Construction</a>
          </div>
          <div className='footer-col'>
            <h4>Contact</h4>
            <a href='https://wa.me/5926275775'>WhatsApp Us</a>
            <a href='mailto:clevelandforde@yahoo.com'>Send Email</a>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>
            © 2026 <span>BarimaVenture</span>. All rights reserved.
          </p>
          <p>
            Innovation in Motion. <span>Built on Trust.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
