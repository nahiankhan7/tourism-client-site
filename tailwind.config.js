/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "tourist-bg": "url('./src/assets/images/add-tourist-bg.jpg')",
      },
    },
  },
  plugins: [],
};
