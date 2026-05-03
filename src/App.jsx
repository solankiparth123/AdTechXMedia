import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load pages for performance
const Home        = lazy(() => import('./pages/Home'));
const Menu        = lazy(() => import('./pages/Menu'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Gallery     = lazy(() => import('./pages/Gallery'));
const About       = lazy(() => import('./pages/About'));
const Feedback    = lazy(() => import('./pages/Feedback'));
const Contact     = lazy(() => import('./pages/Contact'));
const NotFound    = lazy(() => import('./pages/NotFound'));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

// Page loader
function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
    }}>
      <div style={{
        fontSize: '3rem',
        animation: 'float 1.5s ease-in-out infinite',
      }}>🍦</div>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(244,143,177,0.2)',
        borderTopColor: 'var(--pink)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/menu"        element={<Menu />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/gallery"     element={<Gallery />} />
            <Route path="/about"       element={<About />} />
            <Route path="/feedback"    element={<Feedback />} />
            <Route path="/contact"     element={<Contact />} />
            <Route path="*"            element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
