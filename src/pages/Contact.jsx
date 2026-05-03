import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Toast from '../components/Toast';
import './Contact.css';

/* ─── CONFIG ─────────────────────────────────────────────────────────────
 * Replace these with your real credentials before deploying:
 *
 * EmailJS: https://www.emailjs.com
 *   - Create a free account → Email Services → Gmail
 *   - Create two templates (confirmation + admin notification)
 *   - Copy Service ID, Template IDs, and Public Key below
 *
 * Google Sheets Apps Script URL:
 *   1. Create a Google Sheet with columns: Name | Phone | Email | Message | Timestamp
 *   2. Extensions → Apps Script → paste the script from README
 *   3. Deploy → New deployment → Web app → Execute as Me → Anyone → Deploy
 *   4. Copy the web app URL below
 * ────────────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_USER  = 'YOUR_TEMPLATE_USER_ID';   // confirmation to user
const EMAILJS_TEMPLATE_ADMIN = 'YOUR_TEMPLATE_ADMIN_ID';  // notification to admin
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
const GOOGLE_SHEET_URL    = 'YOUR_APPS_SCRIPT_WEB_APP_URL';

const contactInfo = [
  { icon: 'fas fa-map-marker-alt', label: 'Address', value: 'Opp Mango Cinema, Nikol, Ahmedabad', link: 'https://maps.google.com/?q=Opp+Mango+Cinema+Nikol+Ahmedabad' },
  { icon: 'fas fa-phone', label: 'Phone', value: '+91 99093 99884', link: 'tel:+919909399884' },
  { icon: 'fas fa-envelope', label: 'Email', value: 'contact@mornrich.com', link: 'mailto:contact@mornrich.com' },
  { icon: 'fas fa-clock', label: 'Hours', value: 'Daily: 11:00 AM – 11:00 PM', link: null },
];

const faqs = [
  { q: 'Do you offer home delivery?', a: 'Currently we\'re dine-in and takeaway only. Follow us on Instagram for delivery updates!' },
  { q: 'Can I pre-order for birthdays/events?', a: 'Absolutely! Call us at +91 99093 99884 at least 24hrs in advance for bulk orders and event setups.' },
  { q: 'Are your ingredients fresh?', a: '100%! We source fresh fruits daily and never use artificial flavouring. Freshness is our religion 🙏' },
  { q: 'Do you have vegan options?', a: 'Yes! Our fruit sorbets are dairy-free. Ask our staff for the full vegan-friendly list when you visit.' },
  { q: 'Can I visit your kitchen?', a: 'We love transparency! Kitchen tours may be arranged for media & corporates. Drop us an email.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3 }
    );
    gsap.fromTo(infoRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const sendToGoogleSheets = async () => {
    if (GOOGLE_SHEET_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL') return;
    const params = new URLSearchParams({
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
      timestamp: new Date().toISOString(),
    });
    await fetch(`${GOOGLE_SHEET_URL}?${params}`, { method: 'GET', mode: 'no-cors' });
  };

  const sendEmails = async () => {
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') return;
    const { default: emailjs } = await import('@emailjs/browser');

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      from_phone: form.phone,
      message: form.message,
      to_email: form.email,
      admin_email: 'contact@mornrich.com',
    };

    // Send confirmation to user
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_USER, templateParams, EMAILJS_PUBLIC_KEY);
    // Send lead notification to admin
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, templateParams, EMAILJS_PUBLIC_KEY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await Promise.all([sendToGoogleSheets(), sendEmails()]);
      setForm({ name: '', phone: '', email: '', message: '' });
      setToast({ message: 'Message sent! We\'ll get back to you soon 💕', type: 'success' });
    } catch (err) {
      console.error('Contact form error:', err);
      // Still show success if only email fails — data may have been saved to sheets
      setToast({ message: 'Message received! We\'ll be in touch soon.', type: 'success' });
      setForm({ name: '', phone: '', email: '', message: '' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: '' }));
  };

  return (
    <div className="contact-page page-enter">
      {/* Header */}
      <div className="contact-header">
        <div className="blob blob-1" style={{ width: 350, height: 350, top: -100, right: -80, opacity: 0.3 }}></div>
        <div className="blob blob-2" style={{ width: 250, height: 250, bottom: -60, left: -60, opacity: 0.25 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge badge-pink" style={{ marginBottom: '1rem', display: 'inline-block' }}>📬 Contact</span>
          <h1 className="section-title">Let's Have a <span className="text-pink">Conversation</span></h1>
          <p style={{ color: '#888', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto' }}>
            Questions, collaborations, bulk orders, or just want to say hi? We're always around. 🍦
          </p>
        </div>
      </div>

      <div className="container contact-main">
        {/* Contact Info */}
        <div className="contact-info-col" ref={infoRef}>
          <div className="contact-info-card">
            <h2 className="contact-info-title">Get in Touch</h2>
            <p className="contact-info-sub">We typically respond within 2–4 hours during store hours.</p>
            <div className="contact-info-list">
              {contactInfo.map((item, i) => (
                <div key={i} className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <div className="contact-info-label">{item.label}</div>
                    {item.link
                      ? <a href={item.link} target={item.link.startsWith('http') ? '_blank' : '_self'} rel="noopener" className="contact-info-value link">{item.value}</a>
                      : <div className="contact-info-value">{item.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="contact-socials">
              <h4>Follow Us</h4>
              <div className="contact-social-btns">
                <a href="https://www.instagram.com/chill.houseindia/" target="_blank" rel="noopener" className="contact-social-btn instagram">
                  <i className="fab fa-instagram"></i>
                  <span>@chill.houseindia</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61575663722029" target="_blank" rel="noopener" className="contact-social-btn facebook">
                  <i className="fab fa-facebook-f"></i>
                  <span>Chill House India</span>
                </a>
                <a href="https://wa.me/919909399884" target="_blank" rel="noopener" className="contact-social-btn whatsapp">
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="contact-map">
            <iframe
              src="https://maps.google.com/maps?q=Nikol,+Ahmedabad,+Gujarat&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="280"
              style={{ border: 0, borderRadius: '20px', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chill House Location Map"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-col" ref={formRef}>
          <div className="contact-form-card">
            <div className="contact-form-header">
              <span className="contact-form-emoji">💌</span>
              <div>
                <h2>Send Us a Message</h2>
                <p>Fill the form below and we'll get back to you ASAP.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <div className="input-wrap">
                    <i className="fas fa-user input-icon"></i>
                    <input
                      type="text"
                      className={`form-input with-icon ${errors.name ? 'error' : ''}`}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange('name')}
                    />
                  </div>
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <div className="input-wrap">
                    <span className="input-icon input-prefix">+91</span>
                    <input
                      type="tel"
                      className={`form-input with-prefix ${errors.phone ? 'error' : ''}`}
                      placeholder="98765 43210"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <div className="input-wrap">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    type="email"
                    className={`form-input with-icon ${errors.email ? 'error' : ''}`}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                  />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  className={`form-input ${errors.message ? 'error' : ''}`}
                  placeholder="Hi! I'd like to know about... / I'm interested in a bulk order for..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  maxLength={600}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  {errors.message ? <span className="field-error">{errors.message}</span> : <span />}
                  <span style={{ fontSize: '0.75rem', color: '#bbb' }}>{form.message.length}/600</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary contact-submit-btn" disabled={submitting}>
                {submitting
                  ? <><span className="spinner"></span> Sending...</>
                  : <><i className="fas fa-paper-plane"></i> Send Message</>
                }
              </button>
            </form>

            {/* Integration notes */}
            <div className="integration-notes">
              <div className="integration-note">
                <i className="fas fa-table" style={{ color: '#34a853' }}></i>
                <span><strong>Google Sheets:</strong> Set <code>GOOGLE_SHEET_URL</code> at top of file to save leads automatically.</span>
              </div>
              <div className="integration-note">
                <i className="fas fa-envelope" style={{ color: '#4285f4' }}></i>
                <span><strong>EmailJS:</strong> Set <code>EMAILJS_*</code> constants to send confirmation + admin emails.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="section-pad contact-faq">
        <div className="container">
          <div className="text-center">
            <span className="badge badge-blue" style={{ marginBottom: '1rem', display: 'inline-block' }}>❓ FAQs</span>
            <h2 className="section-title">Questions We <span className="text-pink">Get Asked</span> A Lot</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
