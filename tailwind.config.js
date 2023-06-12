/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "1.95em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
