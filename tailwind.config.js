/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
     extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "marquee-slow": "marquee 40s linear infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        lime: {
          400: "#c8f000",
        },
      },
    },
  },
  plugins: [],
}