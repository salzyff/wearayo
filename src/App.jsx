import { useEffect, useState } from 'react';

const products = [
  {
    name: 'Red Runner',
    price: '₦85,000',
    kind: 'new',
    note: 'Clean colour. Everyday energy.',
    image: 'photo-1542291026-7eec264c27ff',
    alt: 'Red low-top sneaker',
  },
  {
    name: 'Classic Court',
    price: '₦62,000',
    kind: 'pre-loved',
    note: 'A little history. A lot of life.',
    image: 'photo-1525966222134-fcfa99b8ae77',
    alt: 'Classic white sneaker',
  },
  {
    name: 'Everyday High',
    price: '₦98,000',
    kind: 'new',
    note: 'A little extra, every day.',
    image: 'photo-1552346154-21d32810aba3',
    alt: 'White and red fashion sneaker',
  },
  {
    name: 'Retro Pace',
    price: '₦57,000',
    kind: 'pre-loved',
    note: 'Old-school look, new plans.',
    image: 'photo-1495555961986-6d4c1ecb7be3',
    alt: 'Retro neutral sneaker',
  },
];

const whatsapp = 'https://wa.me/2349020670276';
const instagram = 'https://www.instagram.com/wearayo.ng';

function ProductCard({ product, onAdd }) {
  const image = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=800&q=82`;
  return (
    <article className="product-card">
      <div className="product-image">
        <img loading="lazy" src={image} alt={product.alt} />
        <span className="tag">{product.kind === 'new' ? 'Brand new' : 'Pre-loved'}</span>
        <button className="quick" onClick={() => onAdd(product)}>
          Add to bag — {product.price}
        </button>
      </div>
      <div className="product-meta"><strong>{product.name}</strong><span>{product.price}</span></div>
      <div className="product-detail">{product.note}</div>
    </article>
  );
}

function App() {
  const [filter, setFilter] = useState('all');
  const [bag, setBag] = useState([]);
  const [isBagOpen, setBagOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2300);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setBagOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  function addToBag(product) {
    setBag((current) => [...current, product]);
    setToast(`${product.name} added to your bag`);
  }

  function chooseFilter(nextFilter) {
    setFilter(nextFilter);
    setMenuOpen(false);
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  }

  function removeFromBag(index) {
    setBag((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  const visibleProducts = filter === 'all' ? products : products.filter((product) => product.kind === filter);
  const order = bag.map((product) => `${product.name} (${product.price})`).join(', ');
  const checkoutUrl = `${whatsapp}?text=${encodeURIComponent(`Hi WearAyo, I’d like to ask about these pairs: ${order || 'your sneakers'}. Are they available?`)}`;

  return (
    <>
      <div className="announcement">Fresh pairs, fair finds <b>✳</b> Shipping from Lagos to everywhere</div>
      <header className="topbar">
        <button className="menu-toggle" aria-label="Open menu" aria-expanded={isMenuOpen} onClick={() => setMenuOpen((open) => !open)}>☰</button>
        <nav className={`navlinks ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#shop" onClick={() => setFilter('all')}>SHOP ALL</a>
          <a href="#shop" onClick={() => chooseFilter('new')}>BRAND NEW</a>
          <a href="#shop" onClick={() => chooseFilter('pre-loved')}>PRE-LOVED</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>OUR STORY</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="WearAyo home">wear<i>ayo</i>.</a>
        <div className="actions">
          <button className="iconbtn search" aria-label="Browse sneakers" onClick={() => document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' })}>⌕</button>
          <button className="iconbtn" aria-label={`Open shopping bag, ${bag.length} items`} onClick={() => setBagOpen(true)}>BAG <span className="bagcount">{bag.length}</span></button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-panel">
            <div className="hero-copy">
              <div className="eyebrow">WearAyo / Magodo, Lagos</div>
              <h1>STEP<br />INTO<br /><em>your</em> era.</h1>
              <p>Good sneakers have a way of changing the whole fit. Find your next favourite pair, brand new or pre-loved.</p>
              <a className="btn" href="#shop">Find your pair <span>↗</span></a>
            </div>
            <div className="hero-art">
              <div className="hero-img" role="img" aria-label="Red sneaker, editorial campaign photograph" />
              <div className="side-note">New finds. Old favourites.</div>
              <div className="hero-sticker">GOOD<br />SOLE<br />ENERGY</div>
            </div>
          </div>
          <div className="hero-bottom"><span>Curated pairs, chosen with care</span><span>Magodo, Lagos · Ships worldwide</span></div>
        </section>

        <div className="ticker" aria-label="Find your pace · Fresh pairs, fair finds · Wear what moves you">
          <div className="ticker-track">{Array.from({ length: 3 }, (_, index) => <span key={index}>Find your pace<span>Fresh pairs, fair finds</span><span>Wear what moves you</span></span>)}</div>
        </div>

        <section className="section" id="shop">
          <div className="section-head"><div><div className="kicker">The good stuff / 01</div><h2>Pairs with a past.<br />Fits with a future.</h2></div><a className="text-link" href="#shop" onClick={() => setFilter('all')}>View all pairs ↗</a></div>
          <div className="filters" aria-label="Filter sneakers">
            {[['all', 'All pairs'], ['new', 'Brand new'], ['pre-loved', 'Pre-loved']].map(([value, label]) => <button key={value} className={`filter ${filter === value ? 'active' : ''}`} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}
          </div>
          <div className="products">{visibleProducts.map((product) => <ProductCard key={product.name} product={product} onAdd={addToBag} />)}</div>
          <p className="demo-note">Mockup preview: product names, availability and prices are sample content.</p>
        </section>

        <section className="feature" id="story">
          <div className="feature-image" role="img" aria-label="A classic sneaker photographed in warm light" />
          <div className="feature-copy"><div className="kicker">From Magodo, with style</div><h2>Good finds.<br />Good feeling.</h2><p>WearAyo is all about finding the pair that feels like you. From brand-new favourites to pre-loved gems, there’s always another good find waiting.</p><a className="btn light" href={instagram} target="_blank" rel="noreferrer">Meet us on Instagram <span>↗</span></a></div>
        </section>

        <section className="split">
          <article className="split-card"><div className="eyebrow">01 / Straight off the shelf</div><div><h3>New pair.<br />New plans.</h3><a href="#shop" className="text-link" onClick={() => setFilter('new')}>Shop brand new ↗</a></div></article>
          <article className="split-card"><div className="eyebrow">02 / Pre-loved, re-loved</div><div><h3>More life<br />in every step.</h3><a href="#shop" className="text-link" onClick={() => setFilter('pre-loved')}>Shop pre-loved ↗</a></div></article>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div><a className="wordmark" href="#top">wear<i>ayo</i>.</a><p>Sneakers &amp; style. Brand new and pre-loved, from Magodo, Lagos.</p><p>Good shoes. Good mood. Repeat.</p></div>
          <div><h4>Explore</h4><div className="footer-links"><a href="#shop" onClick={() => setFilter('all')}>Shop all</a><a href="#shop" onClick={() => chooseFilter('new')}>Brand new</a><a href="#shop" onClick={() => chooseFilter('pre-loved')}>Pre-loved</a><a href="#story">Our story</a></div></div>
          <div><h4>Say hello</h4><div className="footer-links"><a href={instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="mailto:contact.wearayo@gmail.com">Email ↗</a></div></div>
          <div><h4>A little note from us</h4><p>Sign up for new drops and good finds.</p><form className="signup" onSubmit={(event) => { event.preventDefault(); setToast('Thanks — signup is a demo for now.'); event.currentTarget.reset(); }}><input aria-label="Your email" type="email" placeholder="Your email address" required /><button aria-label="Sign up">↗</button></form></div>
        </div>
        <div className="fineprint"><span>© 2026 WearAyo · Lagos, Nigeria</span><span>Step fresh. Stay fly.</span><span>Payments &amp; delivery details to be added</span></div>
      </footer>

      <div className={`drawer-backdrop ${isBagOpen ? 'open' : ''}`} onClick={() => setBagOpen(false)} aria-hidden="true" />
      <aside className={`drawer ${isBagOpen ? 'open' : ''}`} aria-label="Shopping bag" aria-hidden={!isBagOpen}>
        <div className="drawer-head"><h3>Your bag <span>({bag.length})</span></h3><button className="close" onClick={() => setBagOpen(false)} aria-label="Close bag">×</button></div>
        <div className="cart-items">{bag.length ? bag.map((product, index) => <div className="cart-row" key={`${product.name}-${index}`}><div>{product.name}<small>Sample listing · demo price</small></div><strong>{product.price}</strong><button aria-label={`Remove ${product.name}`} onClick={() => removeFromBag(index)}>×</button></div>) : <p className="empty-cart">Your bag is looking a little light.</p>}</div>
        <div className="cart-bottom"><p>This preview uses sample products and prices. Message WearAyo to check current pairs and availability.</p><a className="btn" href={checkoutUrl} target="_blank" rel="noreferrer">Ask on WhatsApp <span>↗</span></a></div>
      </aside>
      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}

export default App;
