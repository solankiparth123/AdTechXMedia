import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export default function NotFound() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );
    gsap.to('.nf-emoji', {
      y: -20, rotation: 15, duration: 1.5,
      ease: 'power1.inOut', yoyo: true, repeat: -1
    });
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      paddingTop: '80px',
      textAlign: 'center',
      padding: '80px 1.5rem',
    }}>
      <div ref={ref}>
        <div className="nf-emoji" style={{ fontSize: '6rem', marginBottom: '1.5rem', display: 'block' }}>🍦</div>
        <h1 style={{
          fontFamily: 'Fredoka One, cursive',
          fontSize: 'clamp(5rem, 15vw, 10rem)',
          color: 'var(--pink)',
          lineHeight: 1,
          marginBottom: '0.5rem',
          textShadow: '4px 4px 0 rgba(244,143,177,0.2)',
        }}>404</h1>
        <h2 style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '1rem' }}>
          Oops! This Page Melted 😅
        </h2>
        <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>
          Looks like this page dripped away. Let's get you back to the good stuff.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            <i className="fas fa-home"></i> Back to Home
          </Link>
          <Link to="/menu" className="btn btn-outline">
            🍦 See Our Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
