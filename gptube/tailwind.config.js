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
        "primary": "#E84545",
        "primary-low": "#FFEBEB",
        "typo": "#F2F2F2",
        // "black-full": "#0A2647",
        // "black-medium": "#144272",
        // "black-low": "#205295",
        // "black-full": "#222831",
        // "black-medium": "#2C394B",
        // "black-low": "#FF4C29",
      }
    },
  },
  plugins: [],
};
