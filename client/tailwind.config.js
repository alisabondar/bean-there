/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")({
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
    }),
  ],
}
