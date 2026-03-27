/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#1B79FD',
          dark: '#0A0F1E',
          navy: '#0D1B3E',
          mid: '#1a2744',
          gray: '#6B7280',
          light: '#F8FAFF',
        }
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(27 121 253 / 0.06)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(27,121,253,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(27,121,253,0.7)' },
        }
      },
      boxShadow: {
        'glow': '0 0 30px rgba(27, 121, 253, 0.3)',
        'glow-lg': '0 0 60px rgba(27, 121, 253, 0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 48px rgba(27, 121, 253, 0.15)',
      }
    },
  },
  plugins: [],
}
