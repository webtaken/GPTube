/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-full": "#1A1A1A",
        "black-medium": "#3A4750",
        "black-low": "#494949",
        primary: "#E84545",
        "primary-low": "#F4A4A4",
        typo: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
