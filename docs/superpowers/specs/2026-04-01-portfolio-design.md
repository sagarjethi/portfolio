# Portfolio Website Design Spec — Sagar Jethi

## Overview

Personal portfolio website for Sagar Jethi, an AI Developer & Blockchain Architect with 10+ years experience. The site showcases professional experience, featured projects, technical skills, and a blog — built with an intentional anti-AI-slop design philosophy.

## Design Decisions

### Personality
Hybrid innovator — technical depth with editorial polish. Code references meet business storytelling.

### Tech Stack
- **Framework:** Astro (static-first, ships zero JS by default)
- **Styling:** Tailwind CSS
- **Blog:** Astro content collections with markdown files
- **Deployment:** GitHub Pages / Netlify (static output)

### Color Palette — GitHub Dark
| Token       | Value     | Usage                     |
|-------------|-----------|---------------------------|
| bg-primary  | `#0d1117` | Page background           |
| bg-card     | `#161b22` | Card/surface backgrounds  |
| border      | `#21262d` | Borders, dividers         |
| text        | `#c9d1d9` | Primary text              |
| text-muted  | `#8b949e` | Secondary/muted text      |
| accent      | `#58a6ff` | Links, highlights, CTAs   |

### Typography
- **Headlines + Body:** Sora (Google Fonts) — soft geometric sans, warm and readable
- **Code/Tags/Technical:** Fira Code (Google Fonts) — ligature-enabled monospace
- **Fallbacks:** system-ui, sans-serif / monospace

### Layout
Top navigation + centered full-width sections. Single-page scroll with smooth navigation. Responsive: mobile-first with breakpoints at sm/md/lg.

## Sections

### 1. Navigation (sticky top)
- Logo: "SJ" monogram in Fira Code
- Links: Work, About, Blog, Contact
- Subtle backdrop blur on scroll
- Mobile: hamburger menu

### 2. Hero (centered)
- Professional photo (circular crop, subtle border)
- Name: "Sagar Jethi" in Sora 700
- Tagline: "AI Developer & Blockchain Architect" in Fira Code, accent color
- One-liner: "I build AI agents and blockchain systems that have powered $5M+ in raises and 30+ autonomous workflows"
- CTA button: "View My Work" scrolls to projects

### 3. Stats Strip
Four metrics in a horizontal row (responsive: 2x2 on mobile):
- **10+** Years Experience
- **30+** AI Agents Built
- **$5M+** Raised by Projects
- **8+** Years in Blockchain

Style: accent-colored numbers, muted labels. No card borders — just typography hierarchy.

### 4. About
First-person narrative, two paragraphs max. Covers:
- Professional identity and passion (AI + blockchain intersection)
- What differentiates: hands-on builder across full stack, from smart contracts to LLM agents
- NOT a CV restatement — a human story

### 5. Experience (vertical timeline)
Left-aligned timeline with accent-colored line. Each entry:
- Company name (linked) + role
- Date range
- 1-2 concise bullet points (impact-focused, not task lists)

Companies shown:
1. Gintonic AI — Full Stack Product Developer (Dec 2024 - Present)
2. Private AI — Product Research & AI Backend Developer (Mar 2024)
3. Velvet Capital — Core Team, Blockchain Architect (Mar 2022)
4. Independent Consultant — Blockchain Development (2019)
5. Nonceblox — Senior Consultant, Blockchain Architect (Nov 2021 - Oct 2021)
6. DomusCoins — Blockchain Developer (Feb 2018 - Oct 2019)

### 6. Featured Projects (2-column grid)
Six project cards, each containing:
- Project name
- One-line description (impact-focused)
- Tech stack tags (Fira Code, pill style)
- External link icon (if URL available)

Projects:
1. **Web3Agent** — AI-driven platform for natural language blockchain operations | web3agent.io
2. **Private AI** — Privacy-first AI agents with encrypted backend systems | thething.privateai.com
3. **Currently.social** — AI-powered social platform with LLM-driven personalization | currently.social
4. **TrustSwap** — DeFi staking smart contracts and frontend | trustswap.com
5. **Akoya Legends** — NFT gaming platform with blockchain architecture | akoyalegends.io
6. **Wallet-as-a-Service** — Secure digital asset management platform (2024)

Responsive: single column on mobile.

### 7. Skills (grouped pills)
Six groups displayed in a flexible grid:
- **Blockchain:** Solidity, Smart Contracts, DeFi, NFTs, Tokenomics, DAO, Multi-Chain, Web3
- **AI & Agents:** LangChain, CrewAI, AutoGen, LLM APIs, Prompt Engineering
- **Backend:** Python, FastAPI, Flask, Node.js, GoLang, PostgreSQL, MySQL, MongoDB
- **Cloud & DevOps:** AWS, Azure, GCP, Docker, CI/CD, Nginx, Kubernetes
- **Frontend:** React.js, Vue.js, Angular, React Native
- **Leadership:** Team Lead, Product Development, Architecture, Agile/Scrum

Each group: label in Fira Code + accent-bordered pills.

### 8. Blog (latest posts grid)
- 3-column grid of latest blog posts (responsive: single column on mobile)
- Each card: title, date, excerpt (first 120 chars), tags, read time
- "View All Posts" link to /blog
- Blog listing page: all posts with tag filtering
- Individual post page: full markdown rendered with code syntax highlighting

### 9. Education (minimal)
Two entries, compact:
- **MCA** — B H Gardi College of Engineering and Technology (2012-2015)
- **BCA** — Sanskar Institute of Management & Information Technology (2010-2012)

### 10. Contact
- Contact form: Name, Email, Message fields + Submit button
- Form handling: Formspree or Netlify Forms (no backend needed)
- Social icons row: GitHub, X/Twitter, LinkedIn

### 11. Footer
- Copyright: "2026 Sagar Jethi"
- Social links repeated
- "Built with Astro" subtle credit (optional)

## Blog Architecture

### Content Collections
```
src/content/blog/
  ├── my-first-post.md
  └── another-post.md
```

### Frontmatter Schema
```yaml
title: "Post Title"
description: "Brief description"
date: 2026-04-01
tags: ["AI", "Blockchain"]
draft: false
```

### Features
- Tag-based filtering on /blog page
- RSS feed at /rss.xml
- Syntax highlighting for code blocks (Shiki, built into Astro)
- Estimated read time

## Anti-AI-Slop Design Rules

These are enforced constraints, not guidelines:

1. **No purple gradients** — palette is GitHub Dark with blue accent only
2. **No Inter font** — Sora + Fira Code exclusively
3. **No glassmorphism** — clean borders and solid backgrounds
4. **No vague hero copy** — specific numbers and outcomes
5. **No 3-box uniform card layouts** — asymmetric rhythm, editorial spacing
6. **No AI-generated illustrations** — real photo, icon-free design, typography-driven
7. **No cards-inside-cards** — flat hierarchy, whitespace for separation
8. **No uniform border-radius everywhere** — intentional use of sharp and rounded edges
9. **No stock "modern SaaS" patterns** — developer-native aesthetic

## Sensitive Information Policy

Excluded from the website:
- Personal email address (contact form instead)
- Phone number
- Physical address
- API keys or credentials
- Specific salary or compensation details
- Internal company information not in public domain

## File Structure (Astro)
```
portfolio/
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, fonts, meta
│   │   ├── BlogLayout.astro        # Blog post wrapper
│   ├── pages/
│   │   ├── index.astro             # Homepage (all sections)
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog listing
│   │   │   └── [slug].astro        # Individual post
│   │   └── rss.xml.ts              # RSS feed
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── Stats.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── Skills.astro
│   │   ├── Blog.astro              # Latest posts preview
│   │   ├── Education.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── content/
│   │   └── blog/
│   │       └── hello-world.md      # Sample post
│   └── styles/
│       └── global.css              # Tailwind directives + custom
├── public/
│   ├── photo.jpg                   # Professional headshot
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```
