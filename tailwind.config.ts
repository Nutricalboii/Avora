import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF6',
          100: '#FBF8F1',
          200: '#F4EFE4',
          300: '#ECE3D0',
          400: '#DCCDA8',
        },
        espresso: {
          400: '#6B5642',
          500: '#4A3522',
          600: '#3A2716',
          700: '#2A1A0E',
          800: '#1C1008',
        },
        gold: {
          400: '#E5C158',
          500: '#D4AF37',
          600: '#B8860B',
          700: '#937008',
        },
        accent: {
          DEFAULT: '#B8860B',
          light: '#D4AF37',
          dark: '#937008',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-plex-mono)', 'IBM Plex Mono', 'monospace'],
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(42, 26, 14, 0.04), 0 12px 36px -12px rgba(42, 26, 14, 0.10)',
        premium: '0 1px 2px rgba(42, 26, 14, 0.05), 0 24px 60px -20px rgba(42, 26, 14, 0.14)',
        gold: '0 8px 24px -8px rgba(184, 134, 11, 0.5)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-up': 'slide-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
