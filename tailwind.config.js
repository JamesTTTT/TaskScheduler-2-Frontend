/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        128: "32rem",
      },
      width: {
        128: "32rem",
      },
      colors: {
        light: {
          primary: "#aea0e5",
          secondary: "#6992e5",
          accent: "#75ddc5",
          neutral: "#1A1C2D",
          base: "#EDF1F7",
          base2: "#cbd5e1",
          info: "#1A1C2D",
          success: "#18BF73",
          warning: "#EFAE52",
          error: "#F26E5A",
        },
        dark: {
          primary: "#b8e8f9",
          secondary: "#fc99d8",
          accent: "#dd7580",
          neutral: "#212831",
          base: "#111827",
          base2: "#1e293b",
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
