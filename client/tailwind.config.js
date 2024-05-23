/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(227, 46, 90)",
        secondary: "rgb(235, 40, 79)",
        white: "rgb(255, 255, 255)",
        lightGrey: "#9ba6a5",
        darkGrey: "rgb(113, 113, 113)",
        ultraGrey: "#ececec",
        black: "rgb(34, 34, 34)",
      },
    },
  },
  plugins: [],
};
