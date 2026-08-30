/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kira: {
          black: '#0B0C10',
          dark: '#14161D',
          card: '#1A1C24',
          gold: '#D4AF37',
          goldLight: '#F3E5AB',
          goldDark: '#996515',
          goldMetallic: 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
          purple: '#7C3AED',
          indigo: '#6366F1',
          blue: '#3B82F6',
          cyan: '#06B6D4',
          lightBg: '#FAFAFD',
        }
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        brand: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 30px rgba(212, 175, 55, 0.25)',
        'gold-sm': '0 0 15px rgba(212, 175, 55, 0.15)',
        'ai-glow': '0 0 30px rgba(99, 102, 241, 0.2)',
        'purple-glow': '0 0 35px rgba(124, 58, 237, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      }
    },
  },
  plugins: [],
}
