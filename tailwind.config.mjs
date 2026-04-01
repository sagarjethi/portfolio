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
