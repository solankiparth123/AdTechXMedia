import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Toast from '../components/Toast';
import './Feedback.css';

gsap.registerPlugin(ScrollTrigger);

// ─── MOCK reviews for demo (replace with Firebase in production) ───
const mockReviews = [
  { id: 1, name: 'Priya Shah', rating: 5, message: 'Absolutely divine! The Rose Pistachio is the best thing I\'ve ever tasted. Will come back every week! 💕', timestamp: new Date(Date.now() - 86400000 * 2), avatar: '👩‍🦱' },
  { id: 2, name: 'Rahul Patel', rating: 5, message: 'Mango Kulfi Falooda = life changing. Seriously the best falooda in all of Ahmedabad. No cap.', timestamp: new Date(Date.now() - 86400000 * 4), avatar: '👨‍🦲' },
  { id: 3, name: 'Zara Khan', rating: 5, message: 'The Oreo Thickshake broke my brain. So thick, so creamy, so Oreo. 10/10 would recommend!', timestamp: new Date(Date.now() - 86400000 * 6), avatar: '👩‍🦰' },
  { id: 4, name: 'Dev Mehta', rating: 4, message: 'Amazing place! Great ambiance, friendly staff, and ice cream that hits different. The sundaes are a must-try.', timestamp: new Date(Date.now() - 86400000 * 8), avatar: '🧑‍🦱' },
  { id: 5, name: 'Aisha Verma', rating: 5, message: 'I dragged my whole family here and now they won\'t stop asking me when we\'re going back. The Rainbow Sundae is SO beautiful!', timestamp: new Date(Date.now() - 86400000 * 10), avatar: '👧' },
  { id: 6, name: 'Aryan Singh', rating: 5, message: 'Best Butterscotch Caramel I\'ve had anywhere in the city. The salted caramel swirl is genius. Chill House = goated! 🔥', timestamp: new Date(Date.now() - 86400000 * 12), avatar: '🧑‍🎤' },
];

const timeAgo = (date) => {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export default function Feedback() {
  const [form, setForm] = useState({ name: '', rating: 0, message: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [reviews, setReviews] = useState(mockReviews);
  const formRef = useRef(null);
  const reviewsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3 }
    );
    ScrollTrigger.create({
      trigger: reviewsRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo('.review-item',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.rating || !form.message.trim()) {
      setToast({ message: 'Please fill in all fields and select a rating!', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      /* ─── FIREBASE INTEGRATION ───────────────────────────────────────
         Uncomment this block after setting up Firebase:

         import { db } from '../utils/firebase';
         import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

         await addDoc(collection(db, 'reviews'), {
           name: form.name.trim(),
           rating: form.rating,
           message: form.message.trim(),
           timestamp: serverTimestamp(),
         });
      ──────────────────────────────────────────────────────────────── */

      // Demo: add locally
      await new Promise(r => setTimeout(r, 1200));
      const newReview = {
        id: Date.now(),
        name: form.name.trim(),
        rating: form.rating,
        message: form.message.trim(),
        timestamp: new Date(),
        avatar: '🆕',
      };
      setReviews(prev => [newReview, ...prev]);
      setForm({ name: '', rating: 0, message: '' });
      setToast({ message: 'Your review was posted! Thank you 💕', type: 'success' });

      // Animate new review in
      setTimeout(() => {
        gsap.fromTo('.review-item:first-child',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
        );
      }, 100);

    } catch (err) {
      console.error(err);
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const ratingDist = [5, 4, 3, 2, 1].map(r => ({
    star: r,
    count: reviews.filter(rev => rev.rating === r).length,
    pct: Math.round((reviews.filter(rev => rev.rating === r).length / reviews.length) * 100),
  }));

  return (
    <div className="feedback-page page-enter">
      {/* Header */}
      <div className="feedback-header">
        <div className="blob blob-1" style={{ width: 350, height: 350, top: -80, right: -80, opacity: 0.3 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>💬 Reviews</span>
          <h1 className="section-title">Tell Us How We <span className="text-pink">Scooped</span> It</h1>
          <p style={{ color: '#888', fontSize: '1.1rem' }}>Real reviews from real ice cream lovers. No filters, all feelings.</p>
        </div>
      </div>

      <div className="container">
        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="rating-big">
            <div className="rating-number">{avgRating.toFixed(1)}</div>
            <div className="stars rating-stars">{'★'.repeat(Math.floor(avgRating))}</div>
            <div className="rating-total">{reviews.length} reviews</div>
          </div>
          <div className="rating-bars">
            {ratingDist.map(({ star, count, pct }) => (
              <div key={star} className="rating-bar-row">
                <span className="bar-label">{star} ★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                </div>
                <span className="bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="feedback-layout">
          <div className="feedback-form-wrap" ref={formRef}>
            <div className="form-card">
              <div className="form-card-header">
                <span className="form-card-icon">✍️</span>
                <div>
                  <h2 className="form-card-title">Write a Review</h2>
                  <p className="form-card-sub">Your opinion genuinely helps other customers (and us too 💕)</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name *</label>
                  <div className="input-wrap">
                    <i className="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      className="form-input with-icon"
                      placeholder="e.g. Priya Shah"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      maxLength={50}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Rating *</label>
                  <div className="star-selector">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        className={`star-btn ${star <= (hoverRating || form.rating) ? 'active' : ''}`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setForm(f => ({ ...f, rating: star }))}
                        aria-label={`${star} star`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="star-label">
                      {(hoverRating || form.rating) > 0 && ['', 'Terrible 😞', 'Not Great 😕', 'Okay 😐', 'Good 😊', 'Amazing! 🤩'][(hoverRating || form.rating)]}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review *</label>
                  <textarea
                    className="form-input"
                    placeholder="Tell us about your experience — what did you try? What did you love?"
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    maxLength={400}
                  />
                  <div className="char-count">{form.message.length}/400</div>
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
                  {submitting ? (
                    <><span className="spinner"></span> Posting...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Post My Review</>
                  )}
                </button>
              </form>

              {/* Firebase Setup Note */}
              <div className="firebase-note">
                <i className="fas fa-info-circle"></i>
                <span><strong>Dev Note:</strong> Connect Firebase Firestore in <code>src/utils/firebase.js</code> to enable persistent reviews.</span>
              </div>
            </div>
          </div>

          {/* Reviews Feed */}
          <div className="reviews-feed" ref={reviewsRef}>
            <div className="feed-header">
              <h3>What People Are Saying</h3>
              <span className="feed-count">{reviews.length} reviews</span>
            </div>
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-item-header">
                    <span className="review-item-avatar">{review.avatar}</span>
                    <div className="review-item-meta">
                      <div className="review-item-name">{review.name}</div>
                      <div className="review-item-time">{timeAgo(review.timestamp)}</div>
                    </div>
                    <div className="review-item-stars stars">{'★'.repeat(review.rating)}</div>
                  </div>
                  <p className="review-item-text">{review.message}</p>
                  <div className="review-item-footer">
                    <span className="review-verified"><i className="fas fa-check-circle"></i> Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
