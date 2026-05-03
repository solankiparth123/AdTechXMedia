import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { products } from '../utils/data';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const imgRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      gsap.fromTo(imgRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
      );
      gsap.fromTo(infoRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, [id]);

  if (!product) return (
    <div style={{ padding: '150px 1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍦</div>
      <h2>Product not found</h2>
      <Link to="/menu" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Back to Menu</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleImgChange = (index) => {
    gsap.fromTo(imgRef.current?.querySelector('.pd-main-img'),
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
    setActiveImg(index);
  };

  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');
  };

  return (
    <div className="pd-page page-enter">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/menu">Menu</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="active">{product.name}</span>
        </div>
      </div>

      {/* Main Detail */}
      <div className="container pd-main">
        {/* Image Gallery */}
        <div className="pd-gallery" ref={imgRef}>
          <div className="pd-main-img-wrap">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="pd-main-img"
            />
            {product.badge && (
              <div className="pd-badge">{product.badge}</div>
            )}
            <div className="pd-img-emoji">{product.emoji}</div>
          </div>
          <div className="pd-thumbnails">
            {product.images.map((img, i) => (
              <button
                key={i}
                className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                onClick={() => handleImgChange(i)}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="pd-info" ref={infoRef}>
          <div className="pd-category">
            <span className="badge badge-pink">{product.category}</span>
          </div>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating">
            <span className="stars pd-stars">{renderStars(product.rating)}</span>
            <span className="pd-rating-num">{product.rating}</span>
            <span className="pd-reviews">({product.reviews} reviews)</span>
          </div>

          <div className="pd-price">₹{product.price}</div>

          <p className="pd-description">{product.description}</p>

          {/* Quantity & CTA */}
          <div className="pd-actions">
            <div className="pd-qty">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="qty-btn">−</button>
              <span className="qty-num">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="qty-btn">+</button>
            </div>
            <div className="pd-total">₹{product.price * quantity}</div>
          </div>

          <div className="pd-ctas">
            <a
              href={`https://wa.me/919909399884?text=Hi! I'd like to order ${quantity}x ${product.name} (₹${product.price * quantity})`}
              target="_blank"
              rel="noopener"
              className="btn btn-primary pd-order-btn"
            >
              <i className="fab fa-whatsapp"></i> Order on WhatsApp
            </a>
            <a href="tel:+919909399884" className="btn btn-outline">
              <i className="fas fa-phone"></i> Call to Order
            </a>
          </div>

          {/* Features */}
          <div className="pd-features">
            {['🍦 Made Fresh Daily', '🌿 Natural Ingredients', '📦 Takeaway Available', '⭐ Rated ' + product.rating + '/5'].map(f => (
              <div key={f} className="pd-feature">{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Tabs */}
      <div className="container pd-details">
        <div className="pd-detail-grid">
          {/* How it's Made */}
          <div className="pd-detail-card">
            <div className="pd-detail-icon">👨‍🍳</div>
            <h3>How It's Made</h3>
            <p>{product.howMade}</p>
          </div>

          {/* Ingredients */}
          <div className="pd-detail-card">
            <div className="pd-detail-icon">🌿</div>
            <h3>Ingredients</h3>
            <div className="ingredients-list">
              {product.ingredients.map(ing => (
                <span key={ing} className="ingredient-tag">{ing}</span>
              ))}
            </div>
          </div>

          {/* More Images */}
          <div className="pd-detail-card pd-more-imgs">
            <div className="pd-detail-icon">📸</div>
            <h3>More Photos</h3>
            <div className="pd-extra-imgs">
              {product.images.map((img, i) => (
                <div key={i} className="pd-extra-img" onClick={() => { setActiveImg(i); window.scrollTo(0, 0); }}>
                  <img src={img} alt={`View ${i + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="container pd-related">
          <h2 className="section-title">You Might Also <span className="text-pink">Love</span> 💕</h2>
          <div className="grid-3">
            {related.map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="related-card">
                <img src={p.images[0]} alt={p.name} loading="lazy" />
                <div className="related-info">
                  <h4>{p.name}</h4>
                  <span>₹{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to Menu */}
      <div className="text-center" style={{ padding: '40px 0 80px' }}>
        <Link to="/menu" className="btn btn-outline">
          ← Back to Full Menu
        </Link>
      </div>
    </div>
  );
}
