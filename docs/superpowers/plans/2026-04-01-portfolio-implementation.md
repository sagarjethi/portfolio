# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Sagar Jethi's portfolio website — an elegant, anti-AI-slop Astro + Tailwind site with blog, using GitHub Dark palette, Sora + Fira Code typography, and top-nav full-width layout.

**Architecture:** Static Astro site with Tailwind CSS for styling. Homepage is a single-page scroll with 11 sections composed from individual `.astro` components. Blog uses Astro content collections with markdown files. No client-side JS frameworks — Astro islands only where needed (mobile menu toggle). Contact form via Formspree.

**Tech Stack:** Astro 5, Tailwind CSS 4, Google Fonts (Sora, Fira Code), Shiki (syntax highlighting, built-in)

---

### Task 1: Scaffold Astro project and configure Tailwind

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `src/styles/global.css`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Astro project**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict
```

- [ ] **Step 2: Install dependencies**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npm install
npm install @astrojs/tailwind tailwindcss @astrojs/rss
```

- [ ] **Step 3: Configure Astro with Tailwind integration**

Replace `astro.config.mjs` with:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://sagarjethi.github.io',
  base: '/portfolio',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
```

- [ ] **Step 4: Configure Tailwind with custom theme**

Replace `tailwind.config.mjs` with:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d1117',
        card: '#161b22',
        border: '#21262d',
        text: '#c9d1d9',
        muted: '#8b949e',
        accent: '#58a6ff',
      },
      fontFamily: {
        sora: ['Sora', 'system-ui', 'sans-serif'],
        fira: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Create global CSS**

Create `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    background-color: #0d1117;
    color: #c9d1d9;
  }

  body {
    font-family: 'Sora', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: #58a6ff;
    color: #0d1117;
  }
}
```

- [ ] **Step 6: Create .gitignore**

Create `.gitignore`:

```
node_modules/
dist/
.astro/
.superpowers/
.DS_Store
```

- [ ] **Step 7: Copy photo to public directory**

```bash
mkdir -p /Users/sagarjethi/project/product2026/portfolio/public
cp "/Users/sagarjethi/project/product2026/portfolio/DSC00049 copy (1).jpg" /Users/sagarjethi/project/product2026/portfolio/public/photo.jpg
```

- [ ] **Step 8: Verify build works**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npx astro build
```

Expected: Build succeeds with no errors.

- [ ] **Step 9: Commit**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
git init
git add package.json astro.config.mjs tailwind.config.mjs tsconfig.json src/styles/global.css .gitignore public/photo.jpg
git commit -m "feat: scaffold Astro project with Tailwind and GitHub Dark theme"
```

---

### Task 2: BaseLayout and Navigation

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/pages/index.astro` (initial placeholder)
- Create: `public/favicon.svg`

- [ ] **Step 1: Create favicon SVG**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#0d1117"/>
  <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#58a6ff" font-family="monospace" font-size="18" font-weight="bold">SJ</text>
</svg>
```

- [ ] **Step 2: Create BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description = "Sagar Jethi — AI Developer & Blockchain Architect. 10+ years building AI agents and blockchain systems." } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="generator" content={Astro.generator} />
    <link rel="icon" type="image/svg+xml" href="/portfolio/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Sora:wght@300;400;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body class="bg-primary text-text min-h-screen">
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Create Nav component**

Create `src/components/Nav.astro`:

```astro
---
const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '/portfolio/blog' },
  { label: 'Contact', href: '#contact' },
];
---

<nav id="nav" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
  <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="/portfolio/" class="font-fira text-accent text-lg font-medium tracking-tight hover:opacity-80 transition-opacity">
      SJ
    </a>

    <!-- Desktop links -->
    <div class="hidden md:flex items-center gap-8">
      {navLinks.map(link => (
        <a
          href={link.href}
          class="font-fira text-sm text-muted hover:text-accent transition-colors duration-200"
        >
          {link.label}
        </a>
      ))}
    </div>

    <!-- Mobile hamburger -->
    <button
      id="menu-toggle"
      class="md:hidden flex flex-col gap-1.5 p-2"
      aria-label="Toggle menu"
    >
      <span class="block w-5 h-0.5 bg-muted transition-all duration-200" id="bar1"></span>
      <span class="block w-5 h-0.5 bg-muted transition-all duration-200" id="bar2"></span>
      <span class="block w-3.5 h-0.5 bg-muted transition-all duration-200" id="bar3"></span>
    </button>
  </div>

  <!-- Mobile menu -->
  <div id="mobile-menu" class="hidden md:hidden border-t border-border bg-primary/95 backdrop-blur-sm">
    <div class="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
      {navLinks.map(link => (
        <a
          href={link.href}
          class="font-fira text-sm text-muted hover:text-accent transition-colors duration-200"
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
</nav>

<script>
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const nav = document.getElementById('nav');

  toggle?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  menu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu?.classList.add('hidden');
    });
  });

  // Backdrop blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav?.classList.add('bg-primary/90', 'backdrop-blur-md', 'border-b', 'border-border');
    } else {
      nav?.classList.remove('bg-primary/90', 'backdrop-blur-md', 'border-b', 'border-border');
    }
  });
</script>
```

- [ ] **Step 4: Create initial index page**

Create `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
---

<BaseLayout title="Sagar Jethi — AI Developer & Blockchain Architect">
  <Nav />
  <main class="pt-20">
    <p class="text-center text-muted py-40">Building...</p>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Verify dev server**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npx astro dev --port 4321
```

Expected: Opens at localhost:4321 with nav visible and "SJ" logo.

- [ ] **Step 6: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/Nav.astro src/pages/index.astro public/favicon.svg
git commit -m "feat: add BaseLayout with Google Fonts and sticky navigation"
```

---

### Task 3: Hero and Stats sections

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/Stats.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero component**

Create `src/components/Hero.astro`:

```astro
---

---

<section id="hero" class="pt-32 pb-16 px-6">
  <div class="max-w-3xl mx-auto text-center">
    <div class="mb-8">
      <img
        src="/portfolio/photo.jpg"
        alt="Sagar Jethi"
        class="w-28 h-28 rounded-full mx-auto object-cover object-top border-2 border-border hover:border-accent transition-colors duration-300"
        loading="eager"
      />
    </div>

    <h1 class="font-sora text-4xl md:text-5xl font-bold tracking-tight mb-4">
      Sagar Jethi
    </h1>

    <p class="font-fira text-accent text-sm md:text-base mb-6 tracking-wide">
      AI Developer & Blockchain Architect
    </p>

    <p class="text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
      I build AI agents and blockchain systems that have powered
      <span class="text-text font-semibold">$5M+</span> in raises and
      <span class="text-text font-semibold">30+</span> autonomous workflows.
    </p>

    <a
      href="#projects"
      class="inline-block font-fira text-sm border border-accent text-accent px-6 py-3 hover:bg-accent hover:text-primary transition-all duration-200"
    >
      View My Work
    </a>
  </div>
</section>
```

- [ ] **Step 2: Create Stats component**

Create `src/components/Stats.astro`:

```astro
---
const stats = [
  { number: '10+', label: 'Years Experience' },
  { number: '30+', label: 'AI Agents Built' },
  { number: '$5M+', label: 'Raised by Projects' },
  { number: '8+', label: 'Years in Blockchain' },
];
---

<section class="py-16 px-6 border-y border-border">
  <div class="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
    {stats.map(stat => (
      <div class="text-center">
        <div class="font-sora text-3xl md:text-4xl font-bold text-accent mb-1">
          {stat.number}
        </div>
        <div class="font-fira text-xs text-muted tracking-wide uppercase">
          {stat.label}
        </div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Update index.astro to include Hero and Stats**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Stats from '../components/Stats.astro';
---

<BaseLayout title="Sagar Jethi — AI Developer & Blockchain Architect">
  <Nav />
  <main>
    <Hero />
    <Stats />
  </main>
</BaseLayout>
```

- [ ] **Step 4: Verify in browser**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npx astro dev --port 4321
```

Expected: Hero with photo, name, tagline, stats strip below. Check mobile responsiveness.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.astro src/components/Stats.astro src/pages/index.astro
git commit -m "feat: add Hero section with photo and Stats strip"
```

---

### Task 4: About and Experience sections

**Files:**
- Create: `src/components/About.astro`
- Create: `src/components/Experience.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create About component**

Create `src/components/About.astro`:

```astro
---

---

<section id="about" class="py-20 px-6">
  <div class="max-w-3xl mx-auto">
    <h2 class="font-sora text-2xl font-bold mb-2">About</h2>
    <div class="w-12 h-0.5 bg-accent mb-8"></div>

    <div class="space-y-5 text-muted leading-relaxed">
      <p>
        I've spent the last decade at the intersection of two fields that are reshaping how we build software:
        artificial intelligence and blockchain. What started as curiosity about smart contracts in 2016
        evolved into a career building production systems — from DeFi protocols managing hundreds of thousands
        in TVL to AI agents that automate complex multi-step workflows.
      </p>
      <p>
        Today I work across the full stack: designing LLM-powered agents with LangChain and CrewAI,
        deploying Solidity contracts for tokenization and DeFi, and shipping web platforms with React and FastAPI.
        I've been part of core teams at <span class="text-text">Velvet Capital</span>,
        built privacy-first AI systems at <span class="text-text">Private AI</span>,
        and currently develop AI-driven decentralized applications at <span class="text-text">Gintonic AI</span>.
        I care about building things that work — not just things that demo well.
      </p>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create Experience component**

Create `src/components/Experience.astro`:

```astro
---
const experiences = [
  {
    company: 'Gintonic AI',
    url: 'https://www.gintonic.ai/',
    role: 'Full Stack Product Developer',
    period: 'Dec 2024 — Present',
    points: [
      'Engineered LLM-powered AI agents with LangChain, CrewAI, and AutoGen for real-time function calling and API integrations.',
      'Deployed smart contracts (ERC-20, ERC-721, ERC-1155) for AI-driven decentralized applications.',
    ],
  },
  {
    company: 'Private AI',
    url: 'https://www.privateai.com/',
    role: 'Product Research & AI Backend Developer',
    period: '2024',
    points: [
      'Architected encrypted backend systems and deployed privacy-first AI agents using LLM frameworks.',
      'Built AI-powered sentiment analysis for Twitter with real-time insights.',
    ],
  },
  {
    company: 'Velvet Capital',
    url: 'https://www.velvet.capital/',
    role: 'Core Team — Blockchain Architect',
    period: '2022',
    points: [
      'Researched and analyzed DeFi products across tokenomics, liquidity protocols, and yield optimization.',
      'Architected multi-chain integrations improving platform interoperability and token utility.',
    ],
  },
  {
    company: 'Independent Consultant',
    role: 'Blockchain Development',
    period: '2019 — 2021',
    points: [
      'Designed and deployed smart contracts for DeFi platforms, tokenized assets, and NFT marketplaces.',
      'Advised enterprises and startups on blockchain architecture, tokenomics, and governance.',
    ],
  },
  {
    company: 'Nonceblox',
    role: 'Blockchain Architect & Cryptography Researcher',
    period: '2021',
    points: [
      'Researched Decentralized Identifiers (DIDs) and decentralized identity frameworks.',
      'Designed and deployed ERC-20 tokens and ICOs with secure contract implementations.',
    ],
  },
  {
    company: 'DomusCoins',
    role: 'Blockchain Developer',
    period: '2018 — 2019',
    points: [
      'Deployed smart contracts on Ethereum for secure, efficient token operations.',
      'Built decentralized applications integrating frontend interfaces with blockchain backends.',
    ],
  },
];
---

<section id="experience" class="py-20 px-6">
  <div class="max-w-3xl mx-auto">
    <h2 class="font-sora text-2xl font-bold mb-2">Experience</h2>
    <div class="w-12 h-0.5 bg-accent mb-10"></div>

    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-0 top-2 bottom-2 w-px bg-border md:left-[7px]"></div>

      <div class="space-y-10 pl-8">
        {experiences.map(exp => (
          <div class="relative">
            <!-- Timeline dot -->
            <div class="absolute -left-8 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-accent bg-primary md:-left-[25px]"></div>

            <div>
              <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                {exp.url ? (
                  <a href={exp.url} target="_blank" rel="noopener noreferrer" class="font-sora font-semibold text-text hover:text-accent transition-colors">
                    {exp.company}
                  </a>
                ) : (
                  <span class="font-sora font-semibold text-text">{exp.company}</span>
                )}
                <span class="font-fira text-xs text-muted">{exp.period}</span>
              </div>
              <p class="font-fira text-sm text-accent mb-3">{exp.role}</p>
              <ul class="space-y-2">
                {exp.points.map(point => (
                  <li class="text-muted text-sm leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-border">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update index.astro**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Stats from '../components/Stats.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
---

<BaseLayout title="Sagar Jethi — AI Developer & Blockchain Architect">
  <Nav />
  <main>
    <Hero />
    <Stats />
    <About />
    <Experience />
  </main>
</BaseLayout>
```

- [ ] **Step 4: Verify in browser**

Expected: About section with narrative text, Experience with vertical timeline and accent dots.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.astro src/components/Experience.astro src/pages/index.astro
git commit -m "feat: add About narrative and Experience timeline sections"
```

---

### Task 5: Projects and Skills sections

**Files:**
- Create: `src/components/Projects.astro`
- Create: `src/components/Skills.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Projects component**

Create `src/components/Projects.astro`:

```astro
---
const projects = [
  {
    name: 'Web3Agent',
    description: 'AI-driven platform that lets users execute complex blockchain operations through natural language commands.',
    tags: ['LangChain', 'CrewAI', 'Solidity', 'React.js', 'Web3'],
    url: 'https://www.web3agent.io',
  },
  {
    name: 'Private AI',
    description: 'Privacy-first AI agents with encrypted backend systems and real-time sentiment analysis.',
    tags: ['LangChain', 'AutoGen', 'FastAPI', 'CrewAI'],
    url: 'https://thething.privateai.com',
  },
  {
    name: 'Currently.social',
    description: 'AI-powered social platform with LLM-driven personalization, content recommendations, and moderation.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'CrewAI', 'AWS'],
    url: 'https://currently.social',
  },
  {
    name: 'TrustSwap',
    description: 'DeFi staking smart contracts enabling secure and efficient token staking for thousands of users.',
    tags: ['Solidity', 'DeFi', 'Web3', 'React.js'],
    url: 'https://trustswap.com',
  },
  {
    name: 'Akoya Legends',
    description: 'NFT gaming platform with blockchain architecture for secure in-game asset transactions.',
    tags: ['Solidity', 'NFTs', 'Node.js', 'Web3'],
    url: 'https://akoyalegends.io',
  },
  {
    name: 'Wallet-as-a-Service',
    description: 'Secure, scalable digital asset management platform with multi-chain support and multi-sig wallets.',
    tags: ['Smart Contracts', 'Multi-Chain', 'Node.js', 'REST APIs'],
  },
];
---

<section id="projects" class="py-20 px-6">
  <div class="max-w-4xl mx-auto">
    <h2 class="font-sora text-2xl font-bold mb-2">Featured Projects</h2>
    <div class="w-12 h-0.5 bg-accent mb-10"></div>

    <div class="grid md:grid-cols-2 gap-6">
      {projects.map(project => (
        <div class="group border border-border p-6 hover:border-accent/40 transition-colors duration-300">
          <div class="flex items-start justify-between mb-3">
            <h3 class="font-sora font-semibold text-lg text-text group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-muted hover:text-accent transition-colors shrink-0 ml-3"
                aria-label={`Visit ${project.name}`}
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
          <p class="text-muted text-sm leading-relaxed mb-4">{project.description}</p>
          <div class="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span class="font-fira text-xs text-accent border border-accent/30 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create Skills component**

Create `src/components/Skills.astro`:

```astro
---
const skillGroups = [
  {
    label: 'Blockchain',
    skills: ['Solidity', 'Smart Contracts', 'DeFi', 'NFTs', 'Tokenomics', 'DAO', 'Multi-Chain', 'Web3'],
  },
  {
    label: 'AI & Agents',
    skills: ['LangChain', 'CrewAI', 'AutoGen', 'LLM APIs', 'Prompt Engineering'],
  },
  {
    label: 'Backend',
    skills: ['Python', 'FastAPI', 'Flask', 'Node.js', 'GoLang', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    label: 'Cloud & DevOps',
    skills: ['AWS', 'Azure', 'GCP', 'Docker', 'CI/CD', 'Nginx', 'Kubernetes'],
  },
  {
    label: 'Frontend',
    skills: ['React.js', 'Vue.js', 'Angular', 'React Native'],
  },
  {
    label: 'Leadership',
    skills: ['Team Lead', 'Product Development', 'Architecture', 'Agile/Scrum'],
  },
];
---

<section id="skills" class="py-20 px-6">
  <div class="max-w-4xl mx-auto">
    <h2 class="font-sora text-2xl font-bold mb-2">Skills</h2>
    <div class="w-12 h-0.5 bg-accent mb-10"></div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skillGroups.map(group => (
        <div>
          <h3 class="font-fira text-sm text-accent mb-3 tracking-wide">{group.label}</h3>
          <div class="flex flex-wrap gap-2">
            {group.skills.map(skill => (
              <span class="text-sm text-muted border border-border px-3 py-1 hover:border-muted transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update index.astro**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Stats from '../components/Stats.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
import Projects from '../components/Projects.astro';
import Skills from '../components/Skills.astro';
---

<BaseLayout title="Sagar Jethi — AI Developer & Blockchain Architect">
  <Nav />
  <main>
    <Hero />
    <Stats />
    <About />
    <Experience />
    <Projects />
    <Skills />
  </main>
</BaseLayout>
```

- [ ] **Step 4: Verify in browser**

Expected: Projects in 2-column grid with hover effects, Skills grouped with pill tags.

- [ ] **Step 5: Commit**

```bash
git add src/components/Projects.astro src/components/Skills.astro src/pages/index.astro
git commit -m "feat: add Projects grid and Skills sections"
```

---

### Task 6: Education, Contact, and Footer sections

**Files:**
- Create: `src/components/Education.astro`
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Education component**

Create `src/components/Education.astro`:

```astro
---
const education = [
  {
    degree: 'Masters of Computer Application',
    institution: 'B H Gardi College of Engineering and Technology',
    period: '2012 — 2015',
  },
  {
    degree: 'Bachelor of Computer Application',
    institution: 'Sanskar Institute of Management & Information Technology',
    period: '2010 — 2012',
  },
];
---

<section id="education" class="py-20 px-6">
  <div class="max-w-3xl mx-auto">
    <h2 class="font-sora text-2xl font-bold mb-2">Education</h2>
    <div class="w-12 h-0.5 bg-accent mb-8"></div>

    <div class="space-y-6">
      {education.map(edu => (
        <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
          <span class="font-fira text-xs text-muted shrink-0 w-28">{edu.period}</span>
          <div>
            <p class="font-sora font-semibold text-text">{edu.degree}</p>
            <p class="text-muted text-sm">{edu.institution}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Create Contact component**

Create `src/components/Contact.astro`:

```astro
---
const socials = [
  {
    label: 'GitHub',
    url: 'https://github.com/sagarjethi',
    icon: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />',
  },
  {
    label: 'X / Twitter',
    url: 'https://x.com/sagarbjethi',
    icon: '<path d="M4 4l11.733 16H20L8.267 4z" /><path d="M4 20l6.768-6.768M15.232 10.232L20 4" />',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sagarjethi',
    icon: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />',
  },
];
---

<section id="contact" class="py-20 px-6">
  <div class="max-w-xl mx-auto">
    <h2 class="font-sora text-2xl font-bold mb-2 text-center">Get in Touch</h2>
    <div class="w-12 h-0.5 bg-accent mb-4 mx-auto"></div>
    <p class="text-muted text-center mb-10">Have a project in mind or want to collaborate? Drop me a message.</p>

    <form action="https://formspree.io/f/xcontact" method="POST" class="space-y-5 mb-12">
      <div>
        <label for="name" class="font-fira text-xs text-muted block mb-2">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          class="w-full bg-card border border-border px-4 py-3 text-text text-sm focus:border-accent focus:outline-none transition-colors"
          placeholder="Your name"
        />
      </div>
      <div>
        <label for="email" class="font-fira text-xs text-muted block mb-2">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          class="w-full bg-card border border-border px-4 py-3 text-text text-sm focus:border-accent focus:outline-none transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label for="message" class="font-fira text-xs text-muted block mb-2">Message</label>
        <textarea
          name="message"
          id="message"
          rows="5"
          required
          class="w-full bg-card border border-border px-4 py-3 text-text text-sm focus:border-accent focus:outline-none transition-colors resize-none"
          placeholder="Tell me about your project..."
        ></textarea>
      </div>
      <button
        type="submit"
        class="font-fira text-sm border border-accent text-accent px-6 py-3 hover:bg-accent hover:text-primary transition-all duration-200 w-full"
      >
        Send Message
      </button>
    </form>

    <div class="flex justify-center gap-6">
      {socials.map(social => (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-muted hover:text-accent transition-colors duration-200"
          aria-label={social.label}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <Fragment set:html={social.icon} />
          </svg>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Create Footer component**

Create `src/components/Footer.astro`:

```astro
---

---

<footer class="border-t border-border py-8 px-6">
  <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <p class="font-fira text-xs text-muted">
      &copy; 2026 Sagar Jethi
    </p>
    <div class="flex gap-6">
      <a href="https://github.com/sagarjethi" target="_blank" rel="noopener noreferrer" class="font-fira text-xs text-muted hover:text-accent transition-colors">GitHub</a>
      <a href="https://x.com/sagarbjethi" target="_blank" rel="noopener noreferrer" class="font-fira text-xs text-muted hover:text-accent transition-colors">X</a>
      <a href="https://www.linkedin.com/in/sagarjethi" target="_blank" rel="noopener noreferrer" class="font-fira text-xs text-muted hover:text-accent transition-colors">LinkedIn</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Update index.astro with all sections**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Stats from '../components/Stats.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
import Projects from '../components/Projects.astro';
import Skills from '../components/Skills.astro';
import Education from '../components/Education.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Sagar Jethi — AI Developer & Blockchain Architect">
  <Nav />
  <main>
    <Hero />
    <Stats />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <Education />
    <Contact />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 5: Verify full homepage in browser**

Expected: All 11 sections render. Scroll navigation works. Responsive on mobile.

- [ ] **Step 6: Commit**

```bash
git add src/components/Education.astro src/components/Contact.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Education, Contact form, and Footer — homepage complete"
```

---

### Task 7: Blog architecture — content collections and pages

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/hello-world.md`
- Create: `src/layouts/BlogLayout.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/components/BlogPreview.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create content collection config**

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: Create sample blog post**

Create `src/content/blog/hello-world.md`:

```markdown
---
title: "Building AI Agents That Actually Ship"
description: "Lessons from building 30+ AI agents across DeFi, privacy, and social platforms — what works, what breaks, and what I'd do differently."
date: 2026-04-01
tags: ["AI", "LangChain", "Production"]
draft: false
---

After building over 30 AI agents across various domains, I've learned that the gap between a demo and a production system is wider than most people think.

## The Demo Trap

Most AI agent tutorials stop at "look, it called a function." The real work starts when you need that agent to handle edge cases, retry gracefully, and not drain your API budget on a loop.

## What Actually Matters

**1. Error boundaries, not error handling.** Don't try to catch every exception. Design circuits that break cleanly.

**2. Cost tracking from day one.** Every LLM call has a price. I've seen agents burn through $200 in an afternoon because nobody instrumented the token counter.

**3. Human-in-the-loop isn't a fallback — it's a feature.** The best agents I've built know when to ask for help.

```python
from langchain.agents import AgentExecutor

# The key insight: set max_iterations low and handle the timeout
agent = AgentExecutor(
    agent=agent,
    tools=tools,
    max_iterations=5,
    early_stopping_method="generate"
)
```

## What's Next

I'm currently exploring multi-agent orchestration with CrewAI at Gintonic AI — coordinating specialized agents that each handle one part of a complex blockchain workflow. More on that soon.
```

- [ ] **Step 3: Create BlogLayout**

Create `src/layouts/BlogLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
}

const { title, description, date, tags } = Astro.props;

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
---

<BaseLayout title={`${title} — Sagar Jethi`} description={description}>
  <Nav />
  <article class="pt-32 pb-20 px-6">
    <div class="max-w-3xl mx-auto">
      <a href="/portfolio/blog" class="font-fira text-sm text-muted hover:text-accent transition-colors mb-8 inline-block">&larr; Back to blog</a>

      <header class="mb-12">
        <h1 class="font-sora text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <div class="flex flex-wrap items-center gap-4 text-sm text-muted">
          <time class="font-fira">{formatDate(date)}</time>
          <div class="flex gap-2">
            {tags.map(tag => (
              <span class="font-fira text-xs text-accent border border-accent/30 px-2 py-0.5">{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <div class="prose prose-invert max-w-none
        prose-headings:font-sora prose-headings:text-text prose-headings:font-bold
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-p:text-muted prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-strong:text-text prose-strong:font-semibold
        prose-code:font-fira prose-code:text-accent prose-code:text-sm
        prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-none
        prose-li:text-muted
        prose-blockquote:border-accent prose-blockquote:text-muted
      ">
        <slot />
      </div>
    </div>
  </article>
  <Footer />
</BaseLayout>
```

- [ ] **Step 4: Create blog listing page**

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';

const posts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
---

<BaseLayout title="Blog — Sagar Jethi">
  <Nav />
  <main class="pt-32 pb-20 px-6">
    <div class="max-w-3xl mx-auto">
      <h1 class="font-sora text-3xl font-bold mb-2">Blog</h1>
      <div class="w-12 h-0.5 bg-accent mb-10"></div>

      {posts.length === 0 ? (
        <p class="text-muted">No posts yet. Check back soon.</p>
      ) : (
        <div class="space-y-8">
          {posts.map(post => (
            <a href={`/portfolio/blog/${post.slug}`} class="block group">
              <article class="border border-border p-6 hover:border-accent/40 transition-colors duration-300">
                <div class="flex flex-wrap items-center gap-3 mb-3">
                  <time class="font-fira text-xs text-muted">{formatDate(post.data.date)}</time>
                  {post.data.tags.map(tag => (
                    <span class="font-fira text-xs text-accent/70">{tag}</span>
                  ))}
                </div>
                <h2 class="font-sora text-lg font-semibold text-text group-hover:text-accent transition-colors mb-2">
                  {post.data.title}
                </h2>
                <p class="text-muted text-sm leading-relaxed">{post.data.description}</p>
              </article>
            </a>
          ))}
        </div>
      )}
    </div>
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 5: Create individual blog post page**

Create `src/pages/blog/[slug].astro`:

```astro
---
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: post,
  }));
}

const post = Astro.props;
const { Content } = await post.render();
---

<BlogLayout
  title={post.data.title}
  description={post.data.description}
  date={post.data.date}
  tags={post.data.tags}
>
  <Content />
</BlogLayout>
```

- [ ] **Step 6: Create BlogPreview component for homepage**

Create `src/components/BlogPreview.astro`:

```astro
---
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
  .slice(0, 3);

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
---

<section id="blog" class="py-20 px-6">
  <div class="max-w-4xl mx-auto">
    <div class="flex items-baseline justify-between mb-2">
      <h2 class="font-sora text-2xl font-bold">Blog</h2>
      <a href="/portfolio/blog" class="font-fira text-sm text-accent hover:underline">View all &rarr;</a>
    </div>
    <div class="w-12 h-0.5 bg-accent mb-10"></div>

    <div class="grid md:grid-cols-3 gap-6">
      {posts.map(post => (
        <a href={`/portfolio/blog/${post.slug}`} class="group block">
          <article class="border border-border p-5 hover:border-accent/40 transition-colors duration-300 h-full flex flex-col">
            <time class="font-fira text-xs text-muted mb-3">{formatDate(post.data.date)}</time>
            <h3 class="font-sora font-semibold text-text group-hover:text-accent transition-colors mb-2">
              {post.data.title}
            </h3>
            <p class="text-muted text-sm leading-relaxed flex-1">
              {post.data.description.slice(0, 120)}{post.data.description.length > 120 ? '...' : ''}
            </p>
            <div class="flex gap-2 mt-3">
              {post.data.tags.slice(0, 2).map(tag => (
                <span class="font-fira text-xs text-accent/70">{tag}</span>
              ))}
            </div>
          </article>
        </a>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 7: Update index.astro with BlogPreview**

Replace `src/pages/index.astro` with:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Stats from '../components/Stats.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
import Projects from '../components/Projects.astro';
import Skills from '../components/Skills.astro';
import BlogPreview from '../components/BlogPreview.astro';
import Education from '../components/Education.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Sagar Jethi — AI Developer & Blockchain Architect">
  <Nav />
  <main>
    <Hero />
    <Stats />
    <About />
    <Experience />
    <Projects />
    <Skills />
    <BlogPreview />
    <Education />
    <Contact />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 8: Install Tailwind typography plugin for prose styles**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npm install @tailwindcss/typography
```

Then add to `tailwind.config.mjs` plugins array:

```javascript
plugins: [require('@tailwindcss/typography')],
```

- [ ] **Step 9: Verify blog works**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npx astro dev --port 4321
```

Expected: Blog preview on homepage shows the sample post. `/blog` lists posts. `/blog/hello-world` renders the full post with syntax highlighting.

- [ ] **Step 10: Commit**

```bash
git add src/content/ src/layouts/BlogLayout.astro src/pages/blog/ src/components/BlogPreview.astro src/pages/index.astro tailwind.config.mjs package.json package-lock.json
git commit -m "feat: add blog with content collections, listing, and post pages"
```

---

### Task 8: RSS feed

**Files:**
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Create RSS feed**

Create `src/pages/rss.xml.ts`:

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Sagar Jethi — Blog',
    description: 'Thoughts on AI agents, blockchain architecture, and building production systems.',
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/portfolio/blog/${post.slug}/`,
    })),
  });
}
```

- [ ] **Step 2: Verify RSS works**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npx astro dev --port 4321
# Visit http://localhost:4321/portfolio/rss.xml
```

Expected: Valid XML RSS feed with the sample blog post.

- [ ] **Step 3: Commit**

```bash
git add src/pages/rss.xml.ts
git commit -m "feat: add RSS feed for blog"
```

---

### Task 9: Final polish — responsive checks, meta tags, build

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (add OG meta tags)
- Modify: `src/styles/global.css` (scrollbar styling, final tweaks)

- [ ] **Step 1: Add Open Graph meta tags to BaseLayout**

In `src/layouts/BaseLayout.astro`, add inside `<head>` after the existing meta tags:

```html
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:image" content="/portfolio/photo.jpg" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="@sagarbjethi" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```

- [ ] **Step 2: Add scrollbar and utility styles to global.css**

Append to `src/styles/global.css`:

```css
@layer base {
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #0d1117;
  }
  ::-webkit-scrollbar-thumb {
    background: #21262d;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #30363d;
  }

  /* Focus styles */
  *:focus-visible {
    outline: 2px solid #58a6ff;
    outline-offset: 2px;
  }
}
```

- [ ] **Step 3: Production build**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npx astro build
```

Expected: Build succeeds. Output in `dist/` directory.

- [ ] **Step 4: Preview production build**

```bash
cd /Users/sagarjethi/project/product2026/portfolio
npx astro preview --port 4321
```

Expected: Site loads correctly at localhost:4321. All links work. Blog posts render. Contact form is present. Responsive on mobile viewport.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css
git commit -m "feat: add OG meta tags, scrollbar styling, and production build polish"
```

---

### Task 10: Deploy setup for GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build Astro
        run: npx astro build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
mkdir -p .github/workflows
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow"
```

- [ ] **Step 3: Push to GitHub**

```bash
git remote add origin https://github.com/sagarjethi/portfolio.git
git branch -M main
git push -u origin main
```

Expected: GitHub Actions triggers, builds the site, and deploys to GitHub Pages.
