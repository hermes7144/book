/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F96162'
      },
      backgroundImage: {
        banner: `url('../public/images/banner.jpg')`,
        avatar: `url('../public/images/avatar.png')`
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      }
    },
  },
  plugins: [],
}

