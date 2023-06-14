/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2em",
            },
          },
        },
        lg: {
          css: {
            h1: {
              fontSize: "2em",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
