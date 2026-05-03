import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../utils/data';
import './Menu.css';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    gsap.fromTo('.menu-card-item',
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
    );
  };

  return (
    <div className="menu-page page-enter">
      {/* Header */}
      <div className="menu-header" ref={headerRef}>
        <div className="menu-header-bg">
          <div className="blob blob-1" style={{ width: 400, height: 400, top: -100, right: -100 }}></div>
          <div className="blob blob-2" style={{ width: 300, height: 300, bottom: -50, left: -50 }}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>🍦 50+ Items</span>
          <h1 className="section-title">Our <span className="text-pink">Drool-worthy</span> Menu</h1>
          <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: 500 }}>
            From artisanal scoops to legendary faloodas — every item is a whole moment. 👑
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="menu-filter-bar">
        <div className="container">
          <div className="menu-filter-inner">
            {/* Search */}
            <div className="menu-search">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search flavours..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="menu-search-input"
              />
              {search && (
                <button onClick={() => setSearch('')} className="search-clear">×</button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="menu-sort"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Category pills */}
          <div className="category-pills">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'pill-active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat === 'All' && '🍦 '}
                {cat === 'Chocolate' && '🍫 '}
                {cat === 'Fruit' && '🍓 '}
                {cat === 'Specials' && '✨ '}
                {cat === 'Sundaes' && '🍨 '}
                {cat === 'Falooda' && '🥛 '}
                {cat === 'Thickshakes' && '🥤 '}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container section-pad" style={{ paddingTop: '2rem' }}>
        {filtered.length > 0 ? (
          <>
            <div className="menu-results-info">
              <span>{filtered.length} item{filtered.length !== 1 ? 's' : ''} found</span>
              {activeCategory !== 'All' && (
                <button onClick={() => setActiveCategory('All')} className="clear-filter">
                  × Clear filter
                </button>
              )}
            </div>
            <div className="menu-grid" ref={gridRef}>
              {filtered.map((product, i) => (
                <div key={product.id} className="menu-card-item" style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="menu-empty">
            <div className="empty-icon">🔍</div>
            <h3>No results found</h3>
            <p>Try a different search or browse all categories</p>
            <button className="btn btn-primary" onClick={() => { setSearch(''); setActiveCategory('All'); }}>
              Show All Items
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="menu-bottom-cta">
        <div className="container text-center">
          <h2>Can't Decide? Let's Help 🍦</h2>
          <p>Call us and our ice cream experts will guide you to your perfect scoop!</p>
          <a href="tel:+919909399884" className="btn btn-primary">
            <i className="fas fa-phone"></i> Call +91 99093 99884
          </a>
        </div>
      </div>
    </div>
  );
}
