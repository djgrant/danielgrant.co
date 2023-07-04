/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2em",
              lineHeight: "1.15",
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
