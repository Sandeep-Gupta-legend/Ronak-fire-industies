/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ember: {
          50: "#fff4e8",
          100: "#ffe2c5",
          200: "#ffc78e",
          300: "#ff9b4d",
          400: "#f97516",
          500: "#df5a0d",
          600: "#b3410b",
          700: "#90310f",
          800: "#742811",
          900: "#5f2212"
        }
      },
      boxShadow: {
        panel: "0 10px 25px rgba(95, 34, 18, 0.10)",
      }
    },
  },
  plugins: [],
};
