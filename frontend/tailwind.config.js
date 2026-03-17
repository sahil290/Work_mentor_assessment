/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        gray: {
          0: '#ffffff',
          25: '#fafafa',
          50: '#f5f5f5',
          100: '#ebebeb',
          150: '#e0e0e0',
          200: '#d6d6d6',
          300: '#b8b8b8',
          400: '#919191',
          500: '#6e6e6e',
          600: '#4b4b4b',
          700: '#333333',
          800: '#1f1f1f',
          900: '#141414',
        },
        brand: {
          DEFAULT: '#0f7aff',
          hover: '#0066e6',
          light: '#e8f2ff',
          muted: '#0f7aff18',
        },
        success: { DEFAULT: '#16a34a', light: '#f0fdf4' },
        danger:  { DEFAULT: '#dc2626', light: '#fef2f2' },
        warn:    { DEFAULT: '#d97706', light: '#fffbeb' },
      },
      boxShadow: {
        xs:  '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        sm:  '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        md:  '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
        lg:  '0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)',
        xl:  '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
      },
      animation: {
        'fade-in':  'fadeIn 0.18s ease-out',
        'slide-up': 'slideUp 0.22s ease-out',
        'scale-in': 'scaleIn 0.18s ease-out',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },                                        to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(8px)' },          to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.97)' },              to: { opacity: 1, transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};