<div align="center">

# Savan Patel

**Founder · Software Engineer · Product Builder**

Lead · Build · Connect

Building products that connect people,  
empower communities,  
and shape the future.

[![Portfolio](https://img.shields.io/badge/spnetinc.com-000000?style=flat&logo=vercel&labelColor=111111)](https://spnetinc.com)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat&logo=next.js&labelColor=111111)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-000000?style=flat&logo=react&labelColor=111111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-000000?style=flat&logo=typescript&labelColor=111111)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-000000?style=flat&logo=tailwindcss&labelColor=111111)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=flat&logo=framer&labelColor=111111)](https://framer.com/motion)
[![MIT](https://img.shields.io/badge/MIT-000000?style=flat&logo=license&labelColor=111111)](#license)

</div>

---

## About

I wrote my first line of code in 2018. I haven't stopped since.

What started as curiosity became a craft, then a company. Today I build **SP NET INC** — not because the world needs another tech company, but because I believe communication, organization, and intelligence can be radically better.

This portfolio is the digital home of that work. It's not a resume. It's a reflection of how I think about product design, engineering, motion, and user experience. Every section, every transition, every pixel is intentional.

If you're here to evaluate my work, you'll find the raw materials below. If you're here to understand how I build, you'll find the philosophy too.

---

## Why This Portfolio Exists

Most portfolios are galleries — collections of past work arranged chronologically. This one is different.

This site exists to demonstrate a complete product mindset. From the hierarchy in the organization tree to the alternating timeline in the footer, every detail serves a purpose. The motion library, the noise overlay, the custom cursor — these aren't decoration. They're signals about how I approach software: with intention, restraint, and respect for the people who use it.

Whether you're a founder evaluating a partner, a recruiter assessing fit, or an engineer curious about the stack, this portfolio should answer one question clearly: *this is how Savan builds.*

---

## Philosophy

> *"To build software that elevates human potential through thoughtful design and precision engineering."*
>
> — Savan Patel

---

## Products

| Product | Purpose | Status | Description |
|---|---|---|---|
| **SP NET GRAM** | Messaging reimagined | Building | End-to-end encrypted communication with premium tools, deep customization, and cross-platform support. |
| **SP NET ADMIN OS** | Enterprise administration | Building | Complete organization management platform with role-based permissions, audit logs, analytics, and moderation. |
| **SP NET AI** | Ecosystem intelligence | Building | AI platform powering smart messaging, automated administration, and privacy-first intelligence across SP NET. |
| **Ecosystem Expansion** | New tools & platforms | Research | Open-source infrastructure and additional products in research and development. |

---

## Current Focus

Actively building three products in parallel. **SP NET GRAM** is the flagship — a messaging platform designed for privacy, productivity, and premium experiences. **SP NET ADMIN OS** is the enterprise counterpart, solving organization management at scale. **SP NET AI** will weave intelligence throughout both.

Each product shares a common foundation: TypeScript, Next.js, React, PostgreSQL, and a commitment to thoughtful design at every layer.

---

## Technology

**Frontend** — Next.js 16, React 19, TypeScript 5, Tailwind CSS 4

**Backend** — Node.js, PostgreSQL, Redis, GraphQL, WebSocket

**Animation** — Framer Motion 12 (spring physics, viewport reveals, layout animations)

**Design** — Geist (Sans & Mono), Lucide Icons, Tailwind merge, clsx

**Development** — ESLint, Husky, TypeScript strict mode, PostCSS

**Deployment** — Vercel (static generation, edge functions, automatic HTTPS)

---

## Project Structure

```
src/
├── app/                  — App Router (layout, pages, API, metadata, fonts)
├── components/
│   ├── layout/           — Header, Footer, ScrollProgress
│   ├── hero/             — Intro section with CTA
│   ├── about/            — Mission, journey, founder story
│   ├── products/         — Product showcase cards
│   ├── projects/         — Roadmap and milestone timeline
│   ├── organization/     — Company hierarchy tree and role catalog
│   ├── experience/       — Expertise and engineering principles
│   ├── tech/             — Technology grid with grouped badges
│   ├── contact/          — Contact form and social links
│   └── ui/               — Cursor, NoiseOverlay, SplashWrapper, CookieConsent
├── data/                 — Static content (personal, products, organization)
└── lib/                  — Utilities (cn helper, types, shared logic)
```

---

## Design Principles

| Principle | Why It Matters |
|---|---|
| **Minimal** | Every element earns its place. Remove until nothing else can be removed — then refine what remains. |
| **Elegant** | Typography creates hierarchy. Space creates rhythm. A well-set heading communicates more than a decorated one. |
| **Premium** | `#050505` foundation. Refined borders. Subtle glow. The absence of color is a deliberate choice — it lets content breathe. |
| **Responsive** | Mobile-first by default. Fluid spacing, adaptive layouts, and touch-friendly targets at every breakpoint. |
| **Accessible** | Semantic HTML, ARIA labels, keyboard navigation, sufficient contrast. Inclusivity is not optional. |
| **Performance First** | Dynamic imports, lazy loading, optimized assets, zero unused CSS. Speed is a feature. |
| **Motion With Purpose** | Every animation reveals, directs, or delights. No gratuitous movement. Spring physics over easing curves. |
| **Typography Driven** | Geist Sans for body, Geist Mono for code. Size, weight, and tracking as the primary design toolkit. |
| **Founder Focused** | The person behind the products. Story over credentials. Authenticity over polish. |

---

## Design Inspiration

This portfolio draws from modern product design philosophies — the restraint of **Apple**, the craft of **Vercel**, the clarity of **Linear**, the precision of **Stripe**, the minimalism of **Nothing**, and the editorial attention of **Fine Shop Design** — while maintaining its own original identity.

The goal was never to imitate. It was to understand why those design languages work, then apply those principles to a personal portfolio context.

---

## Performance

- **Framework**: Next.js 16 App Router with Turbopack
- **Rendering**: Static generation for all content; server-dynamic only for API routes
- **Loading**: Dynamic imports with skeleton fallbacks for below-fold sections
- **Images**: Optimized assets, lazy-loaded with blur placeholders
- **CSS**: Tailwind CSS 4 with JIT — zero unused styles in production
- **JavaScript**: Minimal client bundles; `"use client"` only where interactivity is required
- **Fonts**: Geist via `next/font` — self-hosted, zero external requests
- **SEO**: Open Graph images, JSON-LD structured data, metadata API

---

## Screenshots

| Section | Preview |
|---|---|
| **Hero Preview** | `![Hero](screenshots/hero.png)` — Full hero section at 1440×900 |
| **Desktop Experience** | `![Desktop](screenshots/desktop.png)` — Full-page capture |
| **Mobile Experience** | `![Mobile](screenshots/mobile.png)` — Key sections at 375×812 |
| **Products Showcase** | `![Products](screenshots/products.png)` — Product cards and grid |
| **Organization Tree** | `![Organization](screenshots/organization.png)` — Hierarchy and role catalog |
| **Footer** | `![Footer](screenshots/footer.png)` — Premium footer with timeline and signature |

*Place screenshots in a `screenshots/` directory at the repository root.*

---

## What's Next

The portfolio will evolve alongside the products. An engineering blog with case studies is in planning — deep dives into architecture decisions, animation patterns, and product design trade-offs. A media kit with brand assets and product screenshots will follow. Select infrastructure components may be open-sourced.

The long-term vision: a portfolio that documents not just what I've built, but how I think about building — and continues to improve as I do.

---

## Getting Started

```bash
git clone https://github.com/savanpatel/savan-portfolio.git
cd savan-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run start
```

---

## Contributing

Contributions are welcome for bug fixes and quality improvements. Large visual or architectural changes should align with the existing direction — minimal, premium, founder-focused. Open an issue first to discuss.

---

## License

MIT. See [LICENSE](LICENSE).

---

## Connect

<div align="center">

[GitHub](https://github.com/savanpatelssp) ·
[LinkedIn](https://linkedin.com/in/savanpatel) ·
[Email](mailto:savan@spnetinc.com) ·
[Website](https://spnetinc.com)

</div>

---

<div align="center">

**Lead · Build · Connect**

Designed and engineered by **Savan Patel** · Founder of SP NET INC

Building technology with purpose.

<sub>© 2026 Savan Patel. All rights reserved.</sub>

</div>
