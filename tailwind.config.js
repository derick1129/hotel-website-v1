/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        gold: {
          400: '#D4AF37',
          500: '#B8860B',
        },
      },
      animation: {
        kenburns: 'kenburns 30s infinite alternate',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.1) translate(-10px, -10px)' },
        },
      },
    },
  },
  plugins: [],
}