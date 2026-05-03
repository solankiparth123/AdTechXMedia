import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: '🫶', title: 'Made with Love', desc: 'Every scoop is handcrafted by our passionate team who genuinely loves what they do.' },
  { icon: '🌿', title: 'Real Ingredients', desc: 'No artificial shortcuts. Fresh fruits, real chocolate, pure cream. The good stuff only.' },
  { icon: '😊', title: 'Vibes First', desc: 'We don\'t just sell ice cream. We sell moments, memories, and the best mood of your day.' },
  { icon: '🔬', title: 'Always Innovating', desc: 'New flavours every season. We\'re constantly experimenting so your taste buds never get bored.' },
  { icon: '🌱', title: 'Sustainable', desc: 'Eco-friendly packaging, local sourcing, and a commitment to doing better for the planet.' },
  { icon: '👑', title: 'Premium Always', desc: 'We don\'t compromise on quality. If it doesn\'t meet our standard, it doesn\'t reach your bowl.' },
];

const milestones = [
  { year: '2022', title: 'The Sweet Beginning', desc: 'Started with 8 flavours and a dream, operating from a tiny cart near Nikol.' },
  { year: '2023', title: 'The Lounge Opens', desc: 'Our first proper store launched with 25 flavours. 2000+ customers in month one!' },
  { year: '2024', title: 'Going Viral', desc: 'Our Rose Pistachio Royale blew up on Instagram. We hit 10K+ followers in 3 months.' },
  { year: '2025', title: 'Still Scooping 🍦', desc: '50+ flavours, 10K+ happy customers, and the best ice cream in Ahmedabad. Still growing!' },
];

const team = [
  { emoji: '👨‍🍳', name: 'Chef Arjun', role: 'Head Ice Cream Artist', vibes: 'Obsessed with chocolate, secretly eats test batches' },
  { emoji: '👩‍💼', name: 'Priya', role: 'Brand & Vibes Manager', vibes: 'Responsible for our aesthetic. Hates boring ice cream' },
  { emoji: '🧑‍🔬', name: 'Karan', role: 'Flavour Scientist', vibes: '47 failed experiments before rose pistachio worked' },
];

export default function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    ScrollTrigger.create({
      trigger: '.values-grid',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.value-card',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
        );
      }
    });

    ScrollTrigger.create({
      trigger: '.timeline',
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.timeline-item',
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="about-page page-enter">
      {/* Hero */}
      <div className="about-hero" ref={heroRef}>
        <div className="blob blob-1" style={{ width: 400, height: 400, top: -100, right: -80, opacity: 0.3 }}></div>
        <div className="blob blob-2" style={{ width: 300, height: 300, bottom: -80, left: -60, opacity: 0.25 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>✨ Our Story</span>
          <h1 className="section-title">We're Not Just Ice Cream,<br /><span className="text-pink">We're a Whole Mood</span> 🍦</h1>
          <p className="about-hero-desc">
            Born in Nikol, raised on passion, powered by real ingredients and real love.
            Chill House isn't a brand — it's the feeling you get when everything's right with the world.
          </p>
          <div className="about-hero-emojis">
            {['🍦', '🌸', '😍', '🍫', '🌈', '💕', '🍓', '🌟'].map((e, i) => (
              <span key={i} className="about-emoji" style={{ animationDelay: `${i * 0.3}s` }}>{e}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <section className="section-pad about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-img-col">
              <div className="story-img-stack">
                <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80" alt="Our ice cream" className="story-img story-img-main" />
                <img src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80" alt="Making ice cream" className="story-img story-img-float" />
                <div className="story-sticker">🍦<br /><small>Made with ❤️</small></div>
              </div>
            </div>
            <div className="story-text-col">
              <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>📖 The Story</span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                From a Dream to the <span className="text-pink">Sweetest Destination</span> in Ahmedabad
              </h2>
              <div className="story-text">
                <p>It started with a simple, ridiculous belief: that ice cream could make anyone's day better. Not just good ice cream — <em>great</em> ice cream. The kind that makes you close your eyes on the first bite.</p>
                <p>We started in 2022 with 8 flavours, a tiny cart, and absolutely zero fear. Just passion, creativity, and a stubborn commitment to never using anything artificial.</p>
                <p>Today, Chill House is Nikol's most-loved dessert destination, serving 50+ insane flavours to thousands of happy customers daily. But the mission hasn't changed: <strong>make you smile, one scoop at a time.</strong></p>
                <p>Every flavour on our menu has a story. Every recipe was tested 20+ times before it earned its spot. We're obsessive about quality because you deserve nothing less. 💕</p>
              </div>
              <Link to="/menu" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Try Our Menu 🍦
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad about-values">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>🌟 Why We're Different</span>
            <h2 className="section-title">The Chill House <span className="text-pink">Promise</span></h2>
            <p className="section-sub">Six things we never compromise on. Ever.</p>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad about-timeline">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>⏳ Journey</span>
            <h2 className="section-title">How We Got <span className="text-pink">Here</span></h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{m.year}</div>
                  <h3 className="timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.desc}</p>
                </div>
                <div className="timeline-dot">🍦</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad about-team">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>👥 The Crew</span>
            <h2 className="section-title">The Humans Behind the <span className="text-pink">Scoops</span></h2>
            <p className="section-sub">Meet the obsessives who make your ice cream happen every day.</p>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-avatar">{member.emoji}</div>
                <h3 className="team-name">{member.name}</h3>
                <div className="team-role">{member.role}</div>
                <p className="team-vibes">"{member.vibes}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="about-cta">
        <div className="container text-center">
          <h2>Ready to Fall in Love? 🍦</h2>
          <p>Come visit us or check out the menu. Your next favourite flavour is waiting.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            <Link to="/menu" className="btn btn-primary">Explore Menu</Link>
            <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
