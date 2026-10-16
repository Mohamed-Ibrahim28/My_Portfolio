# Mohamed Ibrahim — Portfolio

A modern, bilingual (Arabic / English) personal portfolio for **Mohamed Ibrahim** — Software Developer & AI Specialist. Built with React + Vite, featuring a dark neon theme, smooth animations, and fully working project & certificate showcases.

> بيت بورتفوليو شخصي ثنائي اللغة (عربي / إنجليزي) بتصميم داكن حديث وأنيميشن ناعم. تحت هتلاقي القسم الإنجليزي وبعده العربي.

---

## 🔗 Live Links

| Platform | URL |
| --- | --- |
| Live demo (GitHub Pages) | https://mohamed-ibrahim28.github.io/My_Portfolio/ |
| Source Code | https://github.com/Mohamed-Ibrahim28/My_Portfolio |

---

## ✨ Features

- 🌗 **Bilingual** — Arabic (RTL, default) & English with a one-click toggle.
- 🎨 **Dark neon theme** with gradients, glassmorphism and animated backdrop.
- 🎞️ **Rich animations** powered by Framer Motion (reveal-on-scroll, counters, tilt cards, custom smooth scrolling).
- 🧭 **Sections** — Hero, About, Stats, Skills, Experience timeline, Searchable/Filterable Projects, Certificates gallery, Contact.
- 🧩 **Smart filtering** for projects (by org & by field) and certificates (by category).
- 🖼️ **Lightbox viewer** for projects and certificates (images + PDF previews).
- 📱 **Fully responsive** and mobile-friendly.

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Framer Motion** — animations
- **React Icons** — icon set
- Plain **CSS** (custom design system, no UI framework)
- Deployed on **GitHub Pages**

## 📁 Project Structure

```
portfolio/
├─ public/
│  ├─ certificates/        # Certificate images & PDFs
│  └─ projects/            # Project screenshots + offline pages
├─ src/
│  ├─ components/          # Navbar, Hero, About, Stats, Skills,
│  │                       # Experience, Projects, Certificates,
│  │                       # Contact, Footer, Backdrop, common
│  ├─ context/             # LanguageContext (AR/EN + RTL)
│  ├─ data/content.js      # All portfolio content (single source of truth)
│  ├─ utils/scroll.js      # Custom smooth scroll helpers
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ index.html
└─ vite.config.js
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production (outputs to /dist)
npm run build

# Preview the production build
npm run preview
```

## 📦 Deployment

- **GitHub Pages** — automated via the workflow in `.github/workflows/deploy.yml`; every push to `main` builds and publishes the site.

## 📬 Contact

- **Email:** eng.mohamed.ibrahim2005@gmail.com
- **Phone / WhatsApp:** +20 112 559 7399
- **LinkedIn:** [mohamed-ibrahim-0b6b50308](https://www.linkedin.com/in/mohamed-ibrahim-0b6b50308/)
- **GitHub:** [@Mohamed-Ibrahim28](https://github.com/Mohamed-Ibrahim28)

---

## 🇪🇬 نبذة عربية

بورتفوليو شخصي حديث لـ **محمد إبراهيم** — مطوّر برمجيات ومتخصص ذكاء اصطناعي.

- ثنائي اللغة (عربي/إنجليزي) بضغطة زر، وبتصميم داكن وأنيميشن ناعم.
- أقسام: الرئيسية، من أنا، الإحصائيات، المهارات، الخبرة، المشاريع، الشهادات، والتواصل.
- فلترة ذكية للمشاريع (حسب الجهة والتخصص) والشهادات (حسب التصنيف).
- عرض المشاريع والشهادات في نافذة منبثقة (صور + PDF).

**التشغيل محليًا:** `npm install` ثم `npm run dev` — والبناء `npm run build`.

© Mohamed Ibrahim — All rights reserved.
