# 🍦 Chill House Ice Cream Lounge — Website

> **Premium Gen Z Ice Cream Brand Website** | React + GSAP + Firebase + Google Sheets

A fully responsive, production-ready multi-page website for **Chill House Ice Cream Lounge**, built with a vibrant pastel aesthetic, smooth GSAP animations, and real backend integrations.

---

## 🚀 Live Preview

Deploy to **Netlify** in under 2 minutes — see [Deployment](#-deployment) section.

---

## 📁 Project Structure

```
chill-house/
├── public/
│   └── _redirects              # Netlify SPA routing fix
├── src/
│   ├── components/
│   │   ├── Navbar.jsx + .css   # Sticky responsive nav with hamburger
│   │   ├── Footer.jsx + .css   # Full footer with socials & contact
│   │   ├── ProductCard.jsx + .css  # Animated product card
│   │   └── Toast.jsx           # Success/error notifications
│   ├── pages/
│   │   ├── Home.jsx + .css     # Hero, featured, gallery, reviews, map
│   │   ├── Menu.jsx + .css     # Filterable/searchable product grid
│   │   ├── ProductDetail.jsx + .css  # Full detail with gallery & order
│   │   ├── Gallery.jsx + .css  # GSAP marquee + masonry + lightbox
│   │   ├── About.jsx + .css    # Brand story, values, timeline, team
│   │   ├── Feedback.jsx + .css # Firebase reviews form + feed
│   │   ├── Contact.jsx + .css  # Google Sheets + EmailJS contact form
│   │   └── NotFound.jsx        # 404 page
│   ├── utils/
│   │   ├── data.js             # All product data (12 items, 6 categories)
│   │   └── firebase.js         # Firebase config (update with your keys)
│   ├── styles/
│   │   └── global.css          # Design tokens, utilities, animations
│   ├── App.jsx                 # Router with lazy loading
│   └── main.jsx                # Entry point
├── google-apps-script.js       # Paste this into Google Apps Script editor
├── index.html                  # HTML entry with Google Fonts & FontAwesome
├── vite.config.js
└── package.json
```

---

## ✨ Features

### Pages
| Page | Features |
|------|----------|
| **Home** | Parallax hero, rotating words, GSAP animations, stats, featured products, drip banner, Instagram gallery preview, reviews, Google Maps embed |
| **Menu** | Category filter pills, live search, price/rating sort, 12 products across 6 categories |
| **Product Detail** | Image slider, quantity selector, WhatsApp order, ingredients, how it's made, related products |
| **Gallery** | GSAP infinite marquee, masonry grid, keyboard-navigable lightbox |
| **About** | Brand story, 6 core values, timeline, team section |
| **Feedback** | ⭐ Star rating, Firebase Firestore reviews (with demo fallback), rating distribution chart |
| **Contact** | Full validation, Google Sheets lead capture, EmailJS dual emails, FAQ accordion |
| **404** | Animated 404 with navigation |

### Technical
- ⚡ **Vite** build (ultra-fast dev + optimised prod bundles)
- 🎬 **GSAP + ScrollTrigger** — parallax, stagger reveals, infinite marquee, card hovers
- 📱 **Mobile-first responsive** — works beautifully from 320px to 4K
- 🔥 **Firebase Firestore** — real-time reviews (plug-and-play)
- 📊 **Google Sheets** — contact form leads via Apps Script
- 📧 **EmailJS** — confirmation + admin notification emails
- 🚀 **Lazy loading** — all pages code-split for fast initial load
- ♿ **Accessible** — semantic HTML, ARIA labels, keyboard nav

---

## 🛠️ Setup & Development

### 1. Prerequisites
```bash
Node.js 18+ required
```

### 2. Install & Run
```bash
npm install
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

---

## 🔥 Firebase Setup (Reviews)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → Add web app → Copy config
3. Enable **Firestore Database** (Start in test mode for development)
4. Update `src/utils/firebase.js`:
```js
const firebaseConfig = {
  apiKey: "YOUR_REAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "YOUR_APP_ID"
};
```
5. In `src/pages/Feedback.jsx`, uncomment the Firebase block (clearly marked with comments)

**Firestore Security Rules** (for production):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{doc} {
      allow read: if true;
      allow create: if request.resource.data.name is string
                    && request.resource.data.rating is number
                    && request.resource.data.rating >= 1
                    && request.resource.data.rating <= 5
                    && request.resource.data.message is string;
    }
  }
}
```

---

## 📊 Google Sheets Setup (Contact Form)

1. Create a Google Sheet with headers: `Name | Phone | Email | Message | Timestamp`
2. **Extensions → Apps Script** → delete default code
3. Paste the entire contents of `google-apps-script.js`
4. **Deploy → New Deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorize & copy the **Web App URL**
6. Paste it in `src/pages/Contact.jsx`:
```js
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
```

---

## 📧 EmailJS Setup (Contact Emails)

1. Create account at [emailjs.com](https://www.emailjs.com) (free tier: 200 emails/month)
2. **Add Email Service** → Gmail → Connect your Gmail account
3. **Create Template 1** (User Confirmation):
   - Subject: `We received your message, {{from_name}}! 🍦`
   - Body: Include `{{from_name}}`, `{{message}}` variables
   - To email: `{{to_email}}`
4. **Create Template 2** (Admin Notification):
   - Subject: `New lead: {{from_name}} — {{from_phone}}`
   - Body: All contact details
   - To email: `{{admin_email}}`
5. Copy your **Service ID**, **Template IDs**, and **Public Key**
6. Update constants in `src/pages/Contact.jsx`:
```js
const EMAILJS_SERVICE_ID     = 'service_xxxxxxx';
const EMAILJS_TEMPLATE_USER  = 'template_xxxxxxx';
const EMAILJS_TEMPLATE_ADMIN = 'template_yyyyyyy';
const EMAILJS_PUBLIC_KEY     = 'xxxxxxxxxxxxxxxxxxx';
```

---

## 🌐 Deployment (Netlify)

### Method 1: Drag & Drop (Fastest)
```bash
npm run build
```
Then drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Method 2: Git + Netlify CI/CD (Recommended)
1. Push your code to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → New site from Git
3. Configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy! Free SSL auto-included.

> The `public/_redirects` file is already included to handle React Router's SPA routing on Netlify.

### Custom Domain
1. Netlify Dashboard → Domain Settings → Add custom domain
2. Update your domain's DNS to point to Netlify

---

## 🎨 Customisation Guide

### Update Brand Info
- **Logo / Name:** `src/components/Navbar.jsx` and `src/components/Footer.jsx`
- **Address / Phone / Email:** `src/components/Footer.jsx` and `src/pages/Contact.jsx`
- **Social Links:** Footer + Contact + Gallery pages

### Add/Edit Products
Edit `src/utils/data.js`:
```js
{
  id: 13,
  name: 'Your New Flavour',
  category: 'Chocolate',  // or: Fruit, Specials, Sundaes, Falooda, Thickshakes
  price: 149,
  emoji: '🍫',
  badge: 'New',
  rating: 4.8,
  reviews: 42,
  description: 'Description here...',
  howMade: 'How it\'s made...',
  ingredients: ['Ingredient 1', 'Ingredient 2'],
  images: [
    'https://your-image-url.com/image1.jpg',
    'https://your-image-url.com/image2.jpg',
    'https://your-image-url.com/image3.jpg',
  ],
  color: '#5D4037',
  bgColor: '#EFEBE9',
}
```

### Change Colours
Edit CSS variables in `src/styles/global.css`:
```css
:root {
  --pink: #F48FB1;
  --bg: #FADADD;
  --blue: #7ED6DF;
  --cream: #FFF3E0;
  --brown: #C69C6D;
}
```

---

## 📞 Contact Info (Pre-configured)
| Field | Value |
|-------|-------|
| **Phone** | +91 99093 99884 |
| **Email** | contact@mornrich.com |
| **Address** | Opp Mango Cinema, Nikol, Ahmedabad |
| **Instagram** | @chill.houseindia |
| **Facebook** | Chill House India |
| **Hours** | Daily 11 AM – 11 PM |

---

## 🏗️ Tech Stack
| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| React Router v6 | SPA routing |
| GSAP 3 + ScrollTrigger | All animations |
| Firebase Firestore | Reviews storage |
| EmailJS | Contact emails |
| Google Apps Script | Sheets lead capture |
| Vite 5 | Build tool |
| Netlify | Hosting + SSL |

---

## 📋 Production Checklist

Before going live, complete:

- [ ] Update Firebase config in `src/utils/firebase.js`
- [ ] Uncomment Firebase code in `src/pages/Feedback.jsx`
- [ ] Set up Google Apps Script and paste URL in `Contact.jsx`
- [ ] Set up EmailJS and paste keys in `Contact.jsx`
- [ ] Set Firestore security rules (copy from README above)
- [ ] Replace placeholder product images with real photos
- [ ] Update Google Maps embed with exact store coordinates
- [ ] Run `npm run build` and test the `dist/` folder
- [ ] Deploy to Netlify and verify all routes work
- [ ] Test on mobile devices
- [ ] Add Google Analytics (optional)

---

*Made with 💕 for Chill House Ice Cream Lounge · Spoon In, Stress Out 🍦*
