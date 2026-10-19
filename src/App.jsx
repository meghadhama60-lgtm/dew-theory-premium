import { useEffect, useId, useMemo, useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'Dew Drop Serum', subtitle: 'Hydration serum · 30 ml', price: 899, oldPrice: 1199, tag: 'BESTSELLER', category: 'Serums', tone: 'sage', description: 'A lightweight daily serum for a fresh, dewy-looking finish.' },
  { id: 2, name: 'Cloud Cream', subtitle: 'Daily moisturiser · 50 g', price: 749, oldPrice: null, tag: 'DAILY ESSENTIAL', category: 'Moisturisers', tone: 'cream', description: 'A soft, cushiony cream for your everyday moisturising ritual.' },
  { id: 3, name: 'Pure Balance Cleanser', subtitle: 'Gentle cleanser · 100 ml', price: 599, oldPrice: null, tag: 'GENTLE CARE', category: 'Cleansers', tone: 'mist', description: 'A gentle-feeling cleanse to start and end your day.' },
  { id: 4, name: 'Golden Hour Oil', subtitle: 'Nourishing face oil · 30 ml', price: 999, oldPrice: null, tag: 'RITUAL FAVOURITE', category: 'Serums', tone: 'amber', description: 'A silky facial oil to make your evening routine feel special.' },
]

const money = value => `₹${value.toLocaleString('en-IN')}`

function LogoMark({ small = false }) {
  return (
    <span className={`logo-lockup ${small ? 'logo-lockup-small' : ''}`} aria-label="Dew Theory">
      <svg className="logo-sprig" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 25V7M16 16C10 16 7 12 7 8c6 0 9 3 9 8ZM16 12c0-5 3-8 8-8 0 5-3 8-8 8ZM16 22c0-5 4-8 9-8 0 5-4 8-9 8Z" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="27" r="1.3" fill="currentColor" />
      </svg>
      <span className="logo-name">dew theory</span>
      <span className="logo-tagline">SKINCARE, SIMPLIFIED.</span>
    </span>
  )
}

function BottleArt({ tone = 'sage', variant = 'serum', label = 'dew theory', hero = false }) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const palette = {
    sage: { glass: '#c7d4c0', light: '#eef3e9', dark: '#8fa38a', cap: '#d3d7ca', ink: '#344c3b' },
    cream: { glass: '#eee6d8', light: '#fbf6ed', dark: '#d5c6af', cap: '#f5eee2', ink: '#625b4b' },
    mist: { glass: '#d7e1dd', light: '#f3f7f3', dark: '#a9bcb4', cap: '#c7d1ca', ink: '#40564b' },
    amber: { glass: '#c78e55', light: '#f4d2a0', dark: '#9c613b', cap: '#e9d6b8', ink: '#49382a' },
  }
  const p = palette[tone] || palette.sage
  const isJar = variant === 'cream'
  const isCleanser = variant === 'cleanser'
  const gid = `${instanceId}-${tone}-${variant}-${hero ? 'hero' : 'card'}`
  return (
    <svg className={`bottle-art ${hero ? 'bottle-art-hero' : ''}`} viewBox="0 0 300 390" role="img" aria-label={`${label} skincare packaging illustration`}>
      <defs>
        <linearGradient id={`${gid}-glass`} x1="0" y1="0" x2="1" y2=".2">
          <stop offset="0" stopColor={p.light} stopOpacity=".98" />
          <stop offset=".25" stopColor={p.glass} stopOpacity=".87" />
          <stop offset=".55" stopColor={p.light} stopOpacity=".6" />
          <stop offset=".82" stopColor={p.dark} stopOpacity=".8" />
          <stop offset="1" stopColor={p.light} stopOpacity=".9" />
        </linearGradient>
        <linearGradient id={`${gid}-cap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b8bdb1" />
          <stop offset=".35" stopColor={p.cap} />
          <stop offset=".7" stopColor="#fffdf6" />
          <stop offset="1" stopColor="#bdc2b6" />
        </linearGradient>
        <linearGradient id={`${gid}-label`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffdf7" stopOpacity=".92" />
          <stop offset="1" stopColor="#eee9dd" stopOpacity=".96" />
        </linearGradient>
        <filter id={`${gid}-shadow`} x="-50%" y="-30%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <ellipse cx="151" cy="354" rx={isJar ? 84 : 68} ry="13" fill="#4a5948" opacity=".17" filter={`url(#${gid}-shadow)`} />
      {isJar ? (
        <g>
          <rect x="65" y="166" width="170" height="155" rx="31" fill={`url(#${gid}-glass)`} stroke={p.dark} strokeOpacity=".35" />
          <ellipse cx="150" cy="178" rx="84" ry="20" fill={p.light} opacity=".8" />
          <rect x="59" y="145" width="182" height="42" rx="12" fill={`url(#${gid}-cap)`} stroke="#b8bcae" strokeOpacity=".7" />
          <path d="M65 164H235" stroke="#a8ad9e" strokeOpacity=".65" />
          <path d="M80 195V286" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".42" />
          <rect x="85" y="207" width="130" height="79" rx="2" fill={`url(#${gid}-label)`} />
          <text x="150" y="230" textAnchor="middle" fontFamily="Georgia,serif" fontSize="16" fill={p.ink}>dew theory</text>
          <path d="M121 240H179" stroke={p.dark} strokeWidth=".7" opacity=".8" />
          <text x="150" y="255" textAnchor="middle" fontSize="7" letterSpacing="1.6" fill={p.ink}>CLOUD CREAM</text>
          <text x="150" y="268" textAnchor="middle" fontSize="6" letterSpacing="1" fill={p.ink} opacity=".8">SOFT DAILY MOISTURE</text>
          <ellipse cx="150" cy="320" rx="84" ry="12" fill={p.dark} opacity=".32" />
        </g>
      ) : (
        <g>
          <rect x="117" y={isCleanser ? 62 : 70} width="66" height="52" rx="9" fill={`url(#${gid}-cap)`} stroke="#adb4a5" strokeWidth="1" />
          {isCleanser && <path d="M150 63V40H179V46H162V63" fill="#d7d9ce" stroke="#aeb4a8" strokeWidth="1.2" strokeLinejoin="round" />}
          {!isCleanser && <rect x="130" y="47" width="40" height="27" rx="6" fill={`url(#${gid}-cap)`} stroke="#b8bcae" strokeWidth=".8" />}
          <rect x="105" y="108" width="90" height="226" rx="25" fill={`url(#${gid}-glass)`} stroke={p.dark} strokeOpacity=".5" strokeWidth="1.2" />
          <path d="M116 128V292" stroke="#fffdf7" strokeWidth="7" strokeLinecap="round" opacity=".48" />
          <path d="M186 145V306" stroke={p.dark} strokeWidth="3" strokeLinecap="round" opacity=".2" />
          <rect x="111" y="186" width="78" height="94" rx="2" fill={`url(#${gid}-label)`} opacity=".95" />
          <text x="150" y="211" textAnchor="middle" fontFamily="Georgia,serif" fontSize="12.5" fill={p.ink}>dew theory</text>
          <path d="M126 221H174" stroke={p.dark} strokeWidth=".65" />
          <text x="150" y="239" textAnchor="middle" fontSize="7" letterSpacing="1.1" fill={p.ink}>{isCleanser ? 'PURE BALANCE' : tone === 'amber' ? 'GOLDEN HOUR' : 'DEW DROP'}</text>
          <text x="150" y="250" textAnchor="middle" fontSize="6.5" letterSpacing=".8" fill={p.ink}>{isCleanser ? 'GENTLE CLEANSER' : tone === 'amber' ? 'FACE OIL' : 'HYDRATION SERUM'}</text>
          <text x="150" y="264" textAnchor="middle" fontSize="6" letterSpacing="1" fill={p.ink} opacity=".8">30 ml / 1.0 fl. oz.</text>
          <ellipse cx="150" cy="333" rx="43" ry="5" fill={p.dark} opacity=".27" />
        </g>
      )}
    </svg>
  )
}

function HeroStillLife() {
  return (
    <div className="still-life" aria-label="Dew Theory skincare still life">
      <div className="still-life-glow" />
      <div className="botanical botanical-left"><svg viewBox="0 0 160 290" aria-hidden="true"><path d="M18 284C28 210 69 134 130 13" fill="none" stroke="#82977b" strokeWidth="2"/><path d="M37 237C5 217 9 184 12 173C42 183 52 207 37 237ZM52 205C42 169 61 148 74 139C90 172 79 193 52 205ZM71 168C45 143 53 113 60 101C89 126 91 148 71 168ZM92 120C73 88 88 67 100 56C120 86 113 105 92 120ZM31 249C65 232 83 248 88 259C59 276 43 269 31 249Z" fill="#9cb08e" fillOpacity=".77" stroke="#71886a" strokeWidth="1.1" strokeLinejoin="round"/></svg></div>
      <div className="botanical botanical-right"><svg viewBox="0 0 170 300" aria-hidden="true"><path d="M19 294C49 222 77 151 144 10" fill="none" stroke="#82977b" strokeWidth="2"/><path d="M47 233C12 215 12 190 19 173C48 188 61 207 47 233ZM65 194C43 166 52 138 63 126C88 153 83 176 65 194ZM90 151C66 124 78 95 89 81C112 110 109 132 90 151ZM112 103C100 77 116 53 127 44C147 70 135 91 112 103ZM41 252C68 231 91 245 99 258C72 278 54 269 41 252Z" fill="#a6b79a" fillOpacity=".72" stroke="#71886a" strokeWidth="1.1" strokeLinejoin="round"/></svg></div>
      <div className="pedestal pedestal-back" />
      <div className="pedestal pedestal-front" />
      <div className="hero-bottle-shadow" />
      <div className="hero-bottle"><BottleArt tone="sage" variant="serum" hero /></div>
      <div className="hero-mini-bottle"><BottleArt tone="cream" variant="cream" hero /></div>
      <div className="floating-label label-top"><span className="label-star">✳</span><span>BOTANICAL-INSPIRED<br/><strong>EVERYDAY CARE</strong></span></div>
      <div className="floating-label label-bottom"><span className="label-dot"/><span><strong>THE DEW DROP SERUM</strong><small>Your daily glow ritual</small></span><b>₹899</b></div>
      <div className="orbit orbit-a"/><div className="orbit orbit-b"/>
      <div className="still-life-sun" />
    </div>
  )
}

function ProductCard({ product, onAdd, wished, onWish, index }) {
  return (
    <article className="product-card reveal" style={{ '--delay': `${index * 100}ms` }}>
      <div className={`product-stage tone-${product.tone}`}>
        <span className="product-tag">{product.tag}</span>
        <button className={`wish-button ${wished ? 'wished' : ''}`} onClick={() => onWish(product.id)} aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} title="Save to wishlist">{wished ? '♥' : '♡'}</button>
        <div className="product-orb" />
        <div className="product-art-wrap"><BottleArt tone={product.tone} variant={product.id === 2 ? 'cream' : product.id === 3 ? 'cleanser' : 'serum'} label={product.name}/></div>
        <button className="quick-add" onClick={() => onAdd(product)}><span>+</span> ADD TO BAG</button>
      </div>
      <div className="product-meta"><div><h3>{product.name}</h3><p>{product.subtitle}</p></div><div className="product-prices"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div></div>
    </article>
  )
}

function App() {
  const [cart, setCart] = useState([])
  const [wishes, setWishes] = useState([])
  const [filter, setFilter] = useState('All essentials')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal:not(.visible)')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(node => node.classList.add('visible'))
      return
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [filter])

  useEffect(() => {
    document.body.classList.toggle('drawer-open', cartOpen)
    return () => document.body.classList.remove('drawer-open')
  }, [cartOpen])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 2600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const filteredProducts = useMemo(() => filter === 'All essentials' ? products : products.filter(product => product.category === filter), [filter])
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const scrollTo = id => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const addToCart = product => {
    setCart(current => {
      const exists = current.find(item => item.id === product.id)
      return exists ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
    })
    setNotice(`${product.name} added to your bag`)
  }
  const changeQuantity = (id, amount) => setCart(current => current.map(item => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter(item => item.quantity > 0))
  const toggleWish = id => setWishes(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  const submitNewsletter = event => {
    event.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <div className="dew-site">
      <div className="announcement"><span className="announcement-star">✳</span> A LITTLE LOVE FOR YOUR SKIN <span className="announcement-divider">·</span> FREE SHIPPING ON ORDERS ABOVE ₹999 <span className="announcement-star">✳</span></div>
      <header className="site-header">
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? '×' : '☰'}</button>
        <nav className={`main-nav ${menuOpen ? 'main-nav-open' : ''}`} aria-label="Main navigation">
          <button onClick={() => scrollTo('shop')}>SHOP ALL</button>
          <button onClick={() => scrollTo('philosophy')}>OUR PHILOSOPHY</button>
          <button onClick={() => scrollTo('ritual')}>SKIN RITUALS</button>
        </nav>
        <button className="brand-button" onClick={() => scrollTo('home')} aria-label="Dew Theory home"><LogoMark /></button>
        <div className="header-actions"><button className="wishlist-shortcut" onClick={() => { scrollTo('shop'); setNotice(wishes.length ? `${wishes.length} saved favourite${wishes.length > 1 ? 's' : ''}` : 'Tap the heart on a product to save it') }} aria-label="Wishlist">♡ <span className="wishlist-count">{wishes.length}</span></button><button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Open bag, ${totalItems} items`}>BAG <span className="bag-count">{totalItems}</span></button></div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-star">✳</span> YOUR DAILY DOSE OF DEW</span>
            <h1>Good skin.<br/><em>Good energy.</em></h1>
            <p>Thoughtful skincare for the skin you're in. Simple rituals, gentle ingredients, and a little more glow every day.</p>
            <div className="hero-actions"><button className="button-primary" onClick={() => scrollTo('shop')}>DISCOVER YOUR RITUAL <span>↗</span></button><button className="button-text" onClick={() => scrollTo('philosophy')}>OUR APPROACH <span>↓</span></button></div>
            <div className="hero-social-proof"><div className="proof-avatars"><span>✳</span><span>✿</span><span>❋</span></div><div><strong>A softer kind of skincare.</strong><small>Made for real-life routines.</small></div></div>
            <div className="hero-index">01 <span/> A SLOWER KIND OF SKINCARE</div>
          </div>
          <HeroStillLife />
          <div className="hero-side-note">BOTANICAL-INSPIRED · EVERYDAY ESSENTIALS</div>
        </section>

        <div className="marquee" aria-label="Dew Theory values"><div className="marquee-track">{Array.from({ length: 2 }).map((_, index) => <div className="marquee-set" key={index}><span>✳ THOUGHTFUL INGREDIENTS</span><i>✦</i><span>EVERYDAY ESSENTIALS</span><i>✦</i><span>YOUR SKIN, YOUR PACE</span><i>✦</i><span>LESS NOISE, MORE GLOW</span><i>✦</i></div>)}</div></div>

        <section className="shop-section section-pad" id="shop">
          <div className="section-heading reveal"><div><span className="eyebrow">YOUR NEW EVERYDAY</span><h2>Meet your <em>skin essentials.</em></h2></div><p>Fewer steps. Thoughtful formulas.<br/>A ritual that feels like you.</p></div>
          <div className="filter-row" aria-label="Filter products">{['All essentials', 'Serums', 'Moisturisers', 'Cleansers'].map(category => <button key={category} className={filter === category ? 'filter-active' : ''} onClick={() => setFilter(category)}>{category}<span>{category === 'All essentials' ? products.length : products.filter(product => product.category === category).length}</span></button>)}</div>
          <div className="product-grid">{filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} onAdd={addToCart} wished={wishes.includes(product.id)} onWish={toggleWish}/>)}</div>
          <div className="shop-footnote reveal"><span className="tiny-asterisk">✳</span><p>Skincare that meets you where you are.<br/><em>Build your own little ritual.</em></p><button className="button-outline" onClick={() => { setFilter('All essentials'); scrollTo('shop') }}>EXPLORE ALL ESSENTIALS <span>↗</span></button></div>
        </section>

        <section className="philosophy-section" id="philosophy">
          <div className="philosophy-art reveal"><div className="philosophy-art-bg"/><div className="art-sun"/><div className="art-leaves"><svg viewBox="0 0 320 390" aria-hidden="true"><path d="M30 388C82 291 117 207 252 13" stroke="#6e8966" strokeWidth="2" fill="none"/><path d="M71 313C26 297 15 266 17 239C58 251 82 278 71 313ZM99 267C65 231 77 198 92 180C126 215 122 244 99 267ZM132 220C104 183 123 150 142 132C165 171 161 201 132 220ZM166 163C141 123 165 91 185 77C205 120 195 144 166 163ZM201 108C190 70 216 44 237 35C250 74 232 96 201 108ZM68 326C103 294 136 309 149 329C112 359 85 348 68 326Z" fill="#95ad88" stroke="#6e8966" strokeWidth="1.2" strokeLinejoin="round"/><path d="M64 342C105 270 152 197 252 13" stroke="#6e8966" strokeWidth="1" fill="none"/></svg></div><div className="philosophy-bottle"><BottleArt tone="cream" variant="cream" hero/></div><div className="art-note">A MOMENT JUST FOR YOU <span>✳</span></div></div>
          <div className="philosophy-copy reveal"><span className="eyebrow">A NOTE FROM US</span><h2>Less fuss.<br/><em>More feeling.</em></h2><p>We believe skincare should feel like a deep breath, not another thing on your to-do list. Thoughtful daily essentials. A softer routine. A moment that's just yours.</p><p>Come as you are. Glow at your own pace.</p><button className="button-text philosophy-link" onClick={() => scrollTo('ritual')}>THE DEW THEORY WAY <span>↗</span></button><div className="signature">with care, always <span>✳</span></div></div>
        </section>

        <section className="ritual-section section-pad" id="ritual">
          <div className="ritual-title reveal"><span className="eyebrow">SMALL STEPS, SOFTER DAYS</span><h2>Your skin deserves<br/><em>a little ritual.</em></h2><p>A simple rhythm for the everyday you.</p></div>
          <div className="ritual-grid"><article className="ritual-card reveal"><div className="ritual-card-top"><span>THE FIRST STEP</span><span>01 / 03</span></div><div className="ritual-symbol symbol-cleanse">◌</div><h3>Cleanse gently.</h3><p>A fresh start, without making your routine feel like work.</p><span className="ritual-line"/></article><article className="ritual-card ritual-card-feature reveal"><div className="ritual-card-top"><span>THE DAILY RESET</span><span>02 / 03</span></div><div className="ritual-symbol symbol-hydrate">✳</div><h3>Hydrate deeply.</h3><p>Give your skin a little drink and let everyday glow find its way.</p><span className="ritual-line"/></article><article className="ritual-card reveal"><div className="ritual-card-top"><span>THE LASTING HABIT</span><span>03 / 03</span></div><div className="ritual-symbol symbol-protect">☼</div><h3>Protect your peace.</h3><p>Finish with care, take a breath, and carry that feeling into your day.</p><span className="ritual-line"/></article></div>
        </section>

        <section className="quote-section"><div className="quote-ornament">“</div><span className="eyebrow">A LITTLE REMINDER</span><blockquote>Your skin doesn't need a hundred steps.<br/><em>Just a little care, consistently.</em></blockquote><div className="quote-stars">✳ &nbsp; ✳ &nbsp; ✳</div><small>THE DEW THEORY APPROACH</small></section>

        <section className="newsletter-section"><div className="newsletter-decor newsletter-decor-left">✳</div><div className="newsletter-content"><span className="eyebrow">A LITTLE NOTE FROM DEW THEORY</span><h2>Good things, <em>in your inbox.</em></h2><p>Skincare notes, little rituals, and first looks at what's coming next.</p>{subscribed ? <div className="subscribed-message"><span>✳</span> You're on the list. Talk soon, lovely.</div> : <form className="newsletter-form" onSubmit={submitNewsletter}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Your email address" required/><button type="submit">COUNT ME IN <span>↗</span></button></form>}<small>No noise. Just the good stuff.</small></div><div className="newsletter-decor newsletter-decor-right">❋</div></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand-column"><button onClick={() => scrollTo('home')} className="footer-logo-button"><LogoMark small/></button><p>Thoughtful skincare for the skin<br/>you're in. Glow at your own pace.</p></div><div className="footer-links"><strong>EXPLORE</strong><button onClick={() => scrollTo('shop')}>Shop all</button><button onClick={() => scrollTo('philosophy')}>Our philosophy</button><button onClick={() => scrollTo('ritual')}>Skin rituals</button></div><div className="footer-links"><strong>THE LITTLE DETAILS</strong><button onClick={() => setNotice('Demo storefront: shipping information coming soon.')}>Shipping & returns</button><button onClick={() => setNotice('Demo storefront: contact details coming soon.')}>Get in touch</button><button onClick={() => setNotice('Demo storefront: ingredient guide coming soon.')}>Ingredient notes</button></div><div className="footer-signoff"><span className="footer-flower">✳</span><p>Made with intention.<br/><em>Worn with love.</em></p></div></div><div className="footer-bottom"><span>© 2026 DEW THEORY. A DESIGN CONCEPT.</span><span>SKINCARE, SIMPLIFIED.</span><button onClick={() => scrollTo('home')}>BACK TO TOP ↑</button></div></footer>

      {cartOpen && <div className="drawer-scrim" role="presentation" onClick={() => setCartOpen(false)}><aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" onClick={event => event.stopPropagation()}><div className="drawer-header"><div><span className="eyebrow">YOUR LITTLE LINE-UP</span><h2>Your bag <em>({totalItems})</em></h2></div><button className="drawer-close" onClick={() => setCartOpen(false)} aria-label="Close shopping bag">×</button></div>{cart.length === 0 ? <div className="empty-cart"><div className="empty-cart-symbol">✳</div><h3>Something lovely<br/><em>belongs here.</em></h3><p>Your bag is taking a little breather. Add something that feels like you.</p><button className="button-primary" onClick={() => { setCartOpen(false); scrollTo('shop') }}>MEET YOUR ESSENTIALS <span>↗</span></button></div> : <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><div className={`cart-item-art tone-${item.tone}`}><BottleArt tone={item.tone} variant={item.id === 2 ? 'cream' : item.id === 3 ? 'cleanser' : 'serum'}/></div><div className="cart-item-info"><h3>{item.name}</h3><p>{item.subtitle}</p><strong>{money(item.price)}</strong><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div></div><button className="remove-item" onClick={() => setCart(current => current.filter(entry => entry.id !== item.id))} aria-label={`Remove ${item.name}`}>×</button></div>)}</div><div className="cart-summary"><div className="shipping-note">{subtotal >= 999 ? 'Lovely! Your order qualifies for free shipping.' : `You're ${money(999 - subtotal)} away from free shipping.`}</div><div className="subtotal-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><small>Shipping and taxes calculated at checkout.</small><button className="checkout-button" onClick={() => { setCartOpen(false); setNotice('This is a demo storefront — checkout is not connected yet.') }}>CONTINUE TO CHECKOUT <span>↗</span></button><button className="continue-shopping" onClick={() => { setCartOpen(false); scrollTo('shop') }}>Continue shopping</button></div></>}</aside></div>}
      {notice && <div className="toast" role="status"><span>✳</span>{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification">×</button></div>}
    </div>
  )
}

export default App
