import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Wave top */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#2d1b33"/>
        </svg>
      </div>

      <div className="footer-body">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-icon">🍦</span>
                <span className="logo-font footer-logo-text">Chill House</span>
              </div>
              <p className="footer-tagline">
                Artisanal ice cream crafted with love, served with vibes. Your happy place, one scoop at a time. 🍦
              </p>
              <div className="footer-socials">
                <a href="https://www.instagram.com/chill.houseindia/" target="_blank" rel="noopener" className="social-btn instagram" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61575663722029" target="_blank" rel="noopener" className="social-btn facebook" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://wa.me/919909399884" target="_blank" rel="noopener" className="social-btn whatsapp" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                {[['/', 'Home'], ['/menu', 'Menu'], ['/gallery', 'Gallery'], ['/about', 'About Us'], ['/feedback', 'Reviews'], ['/contact', 'Contact']].map(([path, label]) => (
                  <li key={path}>
                    <Link to={path}>
                      <i className="fas fa-chevron-right"></i> {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Menu */}
            <div className="footer-section">
              <h4 className="footer-heading">Our Menu</h4>
              <ul className="footer-links">
                {['Ice Cream Scoops', 'Premium Sundaes', 'Classic Falooda', 'Thick Shakes', 'Seasonal Specials', 'Chocolate Delights'].map(item => (
                  <li key={item}>
                    <Link to="/menu">
                      <i className="fas fa-chevron-right"></i> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h4 className="footer-heading">Find Us</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <p>Opp Mango Cinema, Nikol, Ahmedabad</p>
                </div>
                <div className="footer-contact-item">
                  <div className="contact-icon"><i className="fas fa-phone"></i></div>
                  <a href="tel:+919909399884">+91 99093 99884</a>
                </div>
                <div className="footer-contact-item">
                  <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                  <a href="mailto:contact@mornrich.com">contact@mornrich.com</a>
                </div>
                <div className="footer-contact-item">
                  <div className="contact-icon"><i className="fas fa-clock"></i></div>
                  <p>Daily: 11:00 AM – 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2025 <span>Chill House Ice Cream Lounge</span> · Made with 💕 in Ahmedabad</p>
          <p className="footer-love">Spoon In, Stress Out 🍦</p>
        </div>
      </div>
    </footer>
  );
}
