/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./apps/**/*.{vue,js,ts,jsx,tsx}",
    "../../libs/ui/src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
