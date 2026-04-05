/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FAFAF8',
        card: '#FFFFFF',
        border: '#E8E4DE',
        text: '#1A1A1A',
        muted: '#6B6B6B',
        accent: '#E8763A',
        surface: '#F5F3EF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
