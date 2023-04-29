/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#aea0e5",
          secondary: "#6992e5",
          accent: "#75ddc5",
          neutral: "#2F2432",
          base: "#EDF1F7",
          info: "#7CA4E9",
          success: "#18BF73",
          warning: "#EFAE52",
          error: "#F26E5A",
        },
        dark: {
          primary: "#b8e8f9",
          secondary: "#fc99d8",
          accent: "#dd7580",
          neutral: "#212831",
          base: "#282C43",
          info: "#73A2E8",
          success: "#219C5A",
          warning: "#FA9F38",
          error: "#F16575",
        },
      },
      fontFamily: {
        oxygen: ["Oxygen", "sans-serif"],
      },
    },
  },
  plugins: [],
};
