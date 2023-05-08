/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-full": "#1A1A1A",
        "black-medium": "#3A4750",
        "black-low": "#494949",
        primary: "#D91E1E",
        "primary-low": "#F4A4A4",
        typo: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
