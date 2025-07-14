/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3CBD96 ",
        secondary: "#E3F9E7",
        accent: "#37cdbe",
        neutral: "#F9F9F9",
      },
      textColor: {
        custom: "#777E90",
      },
    },
  },
  daisyui: {
    darkTheme: "light",
  },
  plugins: [require("daisyui")],
};
