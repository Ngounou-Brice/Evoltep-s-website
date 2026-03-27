# Evoltep — Official Website

> **Evolving Technology, Empowering People**  
> Premium software engineering company website built with React + Vite + Tailwind CSS + Framer Motion.

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone or download the project
cd evoltep

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview   # Preview production build locally
```

---

## 📁 Project Structure

```
evoltep/
├── public/
│   └── favicon.svg              # Brand favicon
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Sticky nav + mobile hamburger
│   │   ├── Hero.jsx              # Full-screen hero with dashboard mockup
│   │   ├── TechBanner.jsx        # Scrolling tech stack marquee
│   │   ├── Projects.jsx          # Portfolio grid + modal
│   │   ├── Services.jsx          # Alternating layout services
│   │   ├── WhyUs.jsx             # Value proposition grid (dark bg)
│   │   ├── Process.jsx           # Timeline process steps
│   │   ├── Testimonials.jsx      # Auto-play carousel
│   │   ├── About.jsx             # Company story + metrics
│   │   ├── Contact.jsx           # Form + WhatsApp + info
│   │   └── Footer.jsx            # Full footer + newsletter
│   ├── data/
│   │   └── index.js              # All sample data (projects, services, etc.)
│   ├── hooks/
│   │   └── useScrollAnimation.js # Framer Motion animation variants + hook
│   ├── App.jsx                   # Root app with loader + layout
│   ├── main.jsx                  # React entry point
│   └── index.css                 # Tailwind + custom CSS
├── index.html                    # HTML entry with Google Fonts
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Blue | `#1B79FD` |
| Dark Background | `#0A0F1E` |
| Light Background | `#F8FAFF` |
| Heading Font | Syne (Google Fonts) |
| Body Font | DM Sans (Google Fonts) |

### Tailwind Custom Classes

```css
.btn-primary       /* Filled blue CTA button */
.btn-outline       /* Outlined blue button */
.section-title     /* Large section heading */
.section-label     /* Small uppercase label */
.card              /* White rounded card with shadow */
.text-gradient     /* Blue gradient text */
.bg-mesh           /* Radial gradient background */
```

---

## ✨ Features

- **Page Loader** — Animated intro with progress bar
- **Sticky Navbar** — Glass effect on scroll, mobile slide-in menu
- **Hero Section** — Full-screen with live dashboard mockup, floating stat cards
- **Tech Marquee** — Smooth infinite-scroll tech stack strip
- **Projects Grid** — 3-col grid, hover overlay, click-to-open modal
- **Services** — Alternating left/right layout with feature chips
- **Why Us** — Dark section with animated value cards
- **Process** — Vertical timeline with step numbers
- **Testimonials** — Auto-advancing carousel with manual controls
- **About** — Metrics dashboard + company story
- **Contact Form** — With success state + WhatsApp button
- **Footer** — Full links, newsletter signup, social icons
- **Floating WhatsApp** — Fixed bottom-right quick contact
- **Scroll-to-Top** — Appears after scrolling 500px
- **Scroll Animations** — All sections animate in with Framer Motion

---

## 📱 Responsive Breakpoints

| Screen | Layout |
|--------|--------|
| Mobile (`< 768px`) | Single column, hamburger nav |
| Tablet (`768px–1024px`) | 2-column grids |
| Desktop (`> 1024px`) | Full layout with alternating sections |

---

## 🛠️ Customization

### Update Brand Info
Edit `src/data/index.js` to change:
- Project portfolio entries
- Services list
- Testimonials
- Process steps
- Value propositions

### Update Contact Info
Edit `src/components/Contact.jsx` and `src/components/Footer.jsx`:
```js
// Replace with real contact details
email: 'hello@evoltep.com'
phone: '+237 6XX XXX XXX'
whatsapp: 'https://wa.me/YOUR_NUMBER'
```

### Update Social Links
In `src/components/Footer.jsx`:
```js
const socials = [
  { icon: Github, href: 'https://github.com/YOUR_HANDLE' },
  { icon: Linkedin, href: 'https://linkedin.com/company/YOUR_PAGE' },
  { icon: Twitter, href: 'https://twitter.com/YOUR_HANDLE' },
];
```

### Connect a Form Backend
In `src/components/Contact.jsx`, replace the `handleSubmit` function:
```js
const handleSubmit = async (e) => {
  e.preventDefault();
  await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(form),
    headers: { 'Content-Type': 'application/json' },
  });
  setSubmitted(true);
};
```

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag & drop the /dist folder to Netlify
```

### Nginx / VPS
```bash
npm run build
# Serve the /dist folder with Nginx or any static server
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `framer-motion` | Animations & transitions |
| `lucide-react` | Icon library |
| `tailwindcss` | Utility CSS framework |
| `vite` | Build tool & dev server |

---

## 📄 License

© 2025 Evoltep. All rights reserved.

---

Built with ❤️ in Cameroon 🇨🇲 — *Evolving Technology, Empowering People*
