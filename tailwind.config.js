/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        openBackdrop: {
          '0%': { backdropFilter: 'blur(0px) brightness(100%)' },
          '100%': { backdropFilter: 'blur(5px) brightness(75%)' },
        },
        closeBackdrop: {
          '0%': { backdropFilter: 'blur(5px) brightness(75%)' },
          '100%': { backdropFilter: 'blur(0px) brightness(100%)' },
        },
      },
      animation: {
        openBackdrop: 'openBackdrop 0.1s ease-out',
        closeBackdrop: 'closeBackdrop 0.1s ease-out',
      },
    },
  },
  plugins: [],
  darkMode: 'selector'
}
