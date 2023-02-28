/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    boxShadow: {
      'md': ".25rem .25rem"
    },
    extend: {},
  },
  plugins: [ require('@tailwindcss/forms')],
};
