/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/theme";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "black-full": "#1A1A1A",
        "black-medium": "#3A4750",
        "black-low": "#494949",
        primary: "#D91E1E",
        "primary-low": "#F4A4A4",
        typo: "#EDEDED",
        "white-full": "#EDEDED",
        "white-low": "#A1A1A1"
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
