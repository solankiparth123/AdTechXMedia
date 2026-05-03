import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../components/ProductCard';
import { featuredProducts, galleryImages } from '../utils/data';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const heroWords = ['Ice Cream', 'Falooda', 'Sundaes', 'Thickshakes'];

const stats = [
  { icon: '🍦', number: '50+', label: 'Flavours' },
  { icon: '⭐', number: '4.9', label: 'Rating' },
  { icon: '😍', number: '10K+', label: 'Happy Customers' },
  { icon: '🏆', number: '3+', label: 'Years of Joy' },
];

const reviews = [
  { name: 'Priya Shah', avatar: '👩‍🦱', rating: 5, text: 'The Rose Pistachio Royale is literally art. I cried. Came back the next day for more!', location: 'Nikol, Ahmedabad' },
  { name: 'Rahul Patel', avatar: '👨‍🦲', rating: 5, text: 'Best falooda in all of Ahmedabad. Period. The mango kulfi falooda is 🔥🔥🔥', location: 'Maninagar' },
  { name: 'Zara Khan', avatar: '👩‍🦰', rating: 5, text: 'Cute vibes, amazing ice cream. The Oreo thickshake literally broke my brain. 10/10!', location: 'Satellite' },
  { name: 'Dev Mehta', avatar: '🧑‍🦱', rating: 5, text: 'Took my date here. She loved it. We\'re engaged now. Chill House is responsible. 😂', location: 'Bopal' },
];

export default function Home() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const floatRef1 = useRef(null);
  const floatRef2 = useRef(null);
  const floatRef3 = useRef(null);
  const statsRef = useRef(null);
  const featuredRef = useRef(null);
  const reviewsRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Hero parallax
  useEffect(() => {
    const hero = heroRef.current;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (hero) hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotating words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % heroWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .fromTo(ctaRef.current, { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
      .fromTo([floatRef1.current, floatRef2.current, floatRef3.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, stagger: 0.2, ease: 'elastic.out(1, 0.5)' }, '-=0.2');

    // Stats counter
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.stat-item',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
        );
      }
    });

    // Featured cards
    ScrollTrigger.create({
      trigger: featuredRef.current,
      start: 'top 75%',
      onEnter: () => {
        gsap.fromTo('.featured-card-wrap',
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out' }
        );
      }
    });

    // Reviews
    ScrollTrigger.create({
      trigger: reviewsRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.review-card',
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="home page-enter">
      {/* ===== HERO ===== */}
      <section className="hero" ref={heroRef}>
        {/* Blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>

        {/* Floating elements */}
        <div className="hero-float hero-float-1 float" ref={floatRef1}>🍦</div>
        <div className="hero-float hero-float-2 float-delay" ref={floatRef2}>🍨</div>
        <div className="hero-float hero-float-3 float-delay2" ref={floatRef3}>🍓</div>
        <div className="hero-float hero-float-4 float">🌸</div>
        <div className="hero-float hero-float-5 float-delay">🌈</div>

        <div className="hero-content">
          <div className="hero-badge badge badge-pink" ref={subtitleRef}>
            ✨ Artisanal · Nikol, Ahmedabad
          </div>
          <h1 className="hero-title" ref={titleRef}>
            <span className="hero-title-line">Spoon In,</span>
            <span className="hero-title-line hero-title-big shimmer">Stress Out</span>
            <span className="hero-title-line hero-title-sub">
              The best <span className="hero-word">{heroWords[wordIndex]}</span> in town 🍦
            </span>
          </h1>
          <p className="hero-desc">
            Handcrafted with love. Made fresh daily. 50+ insane flavours waiting for your spoon.
          </p>
          <div className="hero-ctas" ref={ctaRef}>
            <Link to="/menu" className="btn btn-primary hero-btn">
              <i className="fas fa-ice-cream"></i> Explore Menu
            </Link>
            <Link to="/about" className="btn btn-outline hero-btn">
              Our Story →
            </Link>
          </div>
          <div className="hero-trust">
            <div className="hero-trust-avatars">
              {['👩','🧑','👨','👩‍🦰','🧑‍🦱'].map((e,i) => (
                <span key={i} className="trust-avatar">{e}</span>
              ))}
            </div>
            <div>
              <div className="stars">★★★★★</div>
              <span className="trust-text">10,000+ happy spoons served!</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section-pad featured-section" ref={featuredRef}>
        <div className="container">
          <div className="text-center">
            <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>🔥 Fan Favourites</span>
            <h2 className="section-title">Made to be <span className="text-pink">Obsessed</span> Over</h2>
            <p className="section-sub">Our bestsellers, fan picks, and the items that'll make you lick the bowl.</p>
          </div>
          <div className="grid-4 featured-grid">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="featured-card-wrap">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/menu" className="btn btn-outline">
              See All 50+ Items <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TAGLINE BANNER ===== */}
      <section className="drip-banner">
        <div className="drip-top">
          {Array(20).fill(0).map((_, i) => (
            <div key={i} className="drip" style={{ animationDelay: `${i * 0.15}s`, left: `${i * 5.2}%` }}></div>
          ))}
        </div>
        <div className="drip-content">
          <h2 className="drip-text logo-font">"Drip Happens, Smile Anyway 🍦"</h2>
          <p>Your mood improves by 100% with every scoop. Science said so (probably).</p>
          <Link to="/menu" className="btn btn-cream">Order Your Happy Scoop</Link>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="section-pad gallery-preview-section">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>📸 Instagram Worthy</span>
            <h2 className="section-title">Looks Good Enough to <span className="text-pink">Post</span></h2>
            <p className="section-sub">Every dish is a photoshoot. Follow us @chill.houseindia</p>
          </div>
          <div className="gallery-preview-grid">
            {galleryImages.slice(0, 6).map((img, i) => (
              <div key={img.id} className={`gallery-preview-item gallery-item-${i}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <i className="fab fa-instagram" style={{ fontSize: '1.5rem', color: 'white' }}></i>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/gallery" className="btn btn-outline">
              <i className="fab fa-instagram"></i> View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="section-pad reviews-section" ref={reviewsRef}>
        <div className="container">
          <div className="text-center">
            <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>💬 Real Love</span>
            <h2 className="section-title">They <span className="text-pink">Screamed</span> for Ice Cream</h2>
            <p className="section-sub">Don't take our word for it — take theirs.</p>
          </div>
          <div className="reviews-grid">
            {reviews.map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <span className="review-avatar">{review.avatar}</span>
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-location"><i className="fas fa-map-marker-alt"></i> {review.location}</div>
                  </div>
                  <div className="review-stars stars">{'★'.repeat(review.rating)}</div>
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-verified"><i className="fas fa-check-circle"></i> Verified Customer</div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/feedback" className="btn btn-primary">Leave Your Review 💕</Link>
          </div>
        </div>
      </section>

      {/* ===== LOCATION CTA ===== */}
      <section className="location-cta">
        <div className="container">
          <div className="location-cta-inner">
            <div className="location-info">
              <span className="badge badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>📍 Find Us</span>
              <h2>Come Chill With Us</h2>
              <p>Opp Mango Cinema, Nikol, Ahmedabad</p>
              <div className="location-details">
                <div className="location-detail">
                  <i className="fas fa-clock"></i>
                  <span>Daily: 11 AM – 11 PM</span>
                </div>
                <div className="location-detail">
                  <i className="fas fa-phone"></i>
                  <a href="tel:+919909399884">+91 99093 99884</a>
                </div>
              </div>
              <div className="location-ctas">
                <a href="https://maps.google.com/?q=Opp+Mango+Cinema+Nikol+Ahmedabad" target="_blank" rel="noopener" className="btn btn-primary">
                  <i className="fas fa-map-marker-alt"></i> Get Directions
                </a>
                <a href="tel:+919909399884" className="btn btn-outline">
                  <i className="fas fa-phone"></i> Call Now
                </a>
              </div>
            </div>
            <div className="location-map">
              <iframe
                src="https://maps.google.com/maps?q=Nikol,+Ahmedabad,+Gujarat&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="360"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chill House Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
