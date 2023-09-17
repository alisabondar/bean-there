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
          "primary": "#9f643d",
          "secondary": "#CFb299",
          "accent": "#A98E77",
          "neutral": "#61493C",
          "base-100": "#111827",
          "info": "#89050e",
          "success": "#9cb686",
          "warning": "#ffd261",
          "error": "#fc9783",
        },
      },
    ],
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui')
  ],

}

