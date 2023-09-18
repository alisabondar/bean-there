/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
            "one": "#CFB299",
            "two": "A98E77",
            "three": "#61493C",
            "four": "#9F643D",
            "black": "#ffffff",
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui')
  ],

}

