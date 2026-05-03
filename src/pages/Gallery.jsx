import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryImages } from '../utils/data';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const gridRef = useRef(null);
  const headerRef = useRef(null);
  const sliderRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    );

    // Stagger grid items on scroll
    ScrollTrigger.batch('.gallery-grid-item', {
      start: 'top 85%',
      onEnter: (elements) => {
        gsap.fromTo(elements,
          { y: 50, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
        );
      }
    });

    // Infinite marquee scroll for slider
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        x: '-50%',
        duration: 25,
        ease: 'none',
        repeat: -1,
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(l => (l + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setLightbox(l => (l - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  const openLightbox = (index) => {
    setLightbox(index);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  // Duplicate for marquee
  const marqueeItems = [...galleryImages, ...galleryImages];

  return (
    <div className="gallery-page page-enter">
      {/* Header */}
      <div className="gallery-header" ref={headerRef}>
        <div className="blob blob-1" style={{ width: 350, height: 350, top: -100, right: -80, opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>📸 The Gallery</span>
          <h1 className="section-title">Every Scoop is a <span className="text-pink">Masterpiece</span></h1>
          <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: 500 }}>
            Scroll, admire, get hungry. Don't say we didn't warn you. 😋
          </p>
          <a
            href="https://www.instagram.com/chill.houseindia/"
            target="_blank"
            rel="noopener"
            className="btn btn-primary"
            style={{ marginTop: '1.5rem' }}
          >
            <i className="fab fa-instagram"></i> Follow @chill.houseindia
          </a>
        </div>
      </div>

      {/* Marquee Slider */}
      <div className="gallery-marquee">
        <div className="marquee-track" ref={marqueeRef}>
          {marqueeItems.map((img, i) => (
            <div key={i} className="marquee-item">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2 className="section-title">The Full <span className="text-pink">Collection</span></h2>
            <p style={{ color: '#888' }}>Click any image to view full size 👆</p>
          </div>
          <div className="gallery-grid" ref={gridRef}>
            {galleryImages.map((img, index) => (
              <div
                key={img.id}
                className={`gallery-grid-item ${img.span === 'wide' ? 'span-wide' : ''} ${img.span === 'tall' ? 'span-tall' : ''}`}
                onClick={() => openLightbox(index)}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-item-overlay">
                  <div className="gallery-item-overlay-content">
                    <i className="fas fa-expand-alt" style={{ fontSize: '1.5rem', color: 'white' }}></i>
                    <span>View</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="gallery-instagram-cta">
        <div className="container text-center">
          <div className="ig-icon">
            <i className="fab fa-instagram"></i>
          </div>
          <h2>Join Our <span className="text-pink">Community</span></h2>
          <p>Share your Chill House moments with <strong>#ChillHouseIndia</strong> and get featured! 💕</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <a href="https://www.instagram.com/chill.houseindia/" target="_blank" rel="noopener" className="btn btn-primary">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575663722029" target="_blank" rel="noopener" className="btn btn-outline">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <i className="fas fa-times"></i>
          </button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt} className="lightbox-img" />
            <div className="lightbox-info">
              <span>{lightbox + 1} / {galleryImages.length}</span>
              <a href="https://www.instagram.com/chill.houseindia/" target="_blank" rel="noopener">
                <i className="fab fa-instagram"></i> @chill.houseindia
              </a>
            </div>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
