/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'pn-bg': '#343045',
        'pn-dark': '#292537',
        'pn-card': '#292c43',
        'pn-darkest': '#211e2b',
        'pn-pink': '#e84d9a',
        'pn-magenta': '#DF53BB',
        'pn-purple': '#a18cd1',
        'pn-lavender': '#fbc2eb',
        'pn-tag': '#45485f',
        'pn-glow': 'rgba(161, 140, 209, 0.3)',
      },
      fontFamily: {
        clash: ['ClashDisplay', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        supply: ['Supply', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'pn': '40px',
      },
      boxShadow: {
        'pn-glow': '0 0 10px rgba(161, 140, 209, 0.5)',
        'pn-pink-glow': '0 0 10px rgba(223, 83, 187, 0.5)',
      },
      keyframes: {
        goright: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(15px)' },
        }
      },
      animation: {
        goright: 'goright 1.5s infinite',
      }
    },
  },
  plugins: [],
};
