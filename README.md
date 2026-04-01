# Sagar Jethi — Portfolio

Personal portfolio website for Sagar Jethi, AI Developer & Blockchain Architect with 10+ years of experience.

## Live Site

[sagarjethi.github.io/portfolio](https://sagarjethi.github.io/portfolio)

## Tech Stack

- **Framework:** [Astro](https://astro.build) — static-first, zero JS by default
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Typography:** Sora + Fira Code (Google Fonts)
- **Blog:** Astro Content Collections with Markdown
- **Deployment:** GitHub Pages via GitHub Actions

## Features

- Single-page portfolio with smooth scroll navigation
- Blog with markdown posts, syntax highlighting, and RSS feed
- Responsive design — mobile-first
- Contact form via Formspree
- GitHub Dark color palette with custom glow effects
- Anti-AI-slop design: no purple gradients, no Inter, no glassmorphism

## Sections

- Hero with impact stats
- About
- Experience timeline
- Featured Projects
- Skills & Tools
- Volunteer & Community
- Blog
- Education
- Contact

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Blog

Add new posts as markdown files in `src/content/blog/`:

```markdown
---
title: "Post Title"
description: "Brief description"
date: 2026-04-01
tags: ["AI", "Blockchain"]
draft: false
---

Your content here...
```

## Deployment

Pushes to `main` trigger automatic deployment via GitHub Actions. To set up:

1. Go to **Settings > Pages** in the repository
2. Set Source to **GitHub Actions**

## License

MIT
