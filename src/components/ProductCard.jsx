import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -10, duration: 0.3, ease: 'power2.out' });
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.3, ease: 'power2.out' });
    gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' });
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div
        ref={cardRef}
        className="product-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Badge */}
        {product.badge && (
          <div className="product-badge">{product.badge}</div>
        )}

        {/* Image */}
        <div className="product-img-wrap">
          <img
            ref={imgRef}
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="product-img"
          />
          <div className="product-img-overlay">
            <span className="view-btn">View Details →</span>
          </div>
        </div>

        {/* Info */}
        <div className="product-info">
          <div className="product-cat-emoji">{product.emoji}</div>
          <h3 className="product-name">{product.name}</h3>
          <div className="product-meta">
            <span className="stars product-stars">{'★'.repeat(Math.floor(product.rating))}</span>
            <span className="product-reviews">({product.reviews})</span>
          </div>
          <p className="product-desc">{product.description.substring(0, 75)}...</p>
          <div className="product-footer">
            <span className="product-price">₹{product.price}</span>
            <button className="product-order-btn">
              <i className="fas fa-shopping-bag"></i>
              Order
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
