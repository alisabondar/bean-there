/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'stripes': "url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')"
      },
      screens: {
        'xl': '1280px'
      }
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#CFB299",
          "secondary": "#A98E77",
          "accent": "#61493C",
          "neutral": "#9F643D",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui')
  ],

}

