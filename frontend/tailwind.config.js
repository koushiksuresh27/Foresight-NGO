/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-yellow': '#ffe17c',
        'neo-charcoal': '#171e19',
        'neo-sage': '#b7c6c2',
      },
      boxShadow: {
        'neo-base': '4px 4px 0px 0px #000000',
        'neo-lg': '8px 8px 0px 0px #000000',
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        display: ['Cabinet Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
