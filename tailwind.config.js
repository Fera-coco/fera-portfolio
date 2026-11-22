/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF7F0",
        paper: "#FFFFFF",
        ink: "#1E1C1A",
        muted: "#6E6A64",
        tangerine: "#FF6B35",
        sun: "#FFD23F",
        mint: "#3DD68C",
        sky: "#4CC9F0",
        pink: "#FF70A6",
        lilac: "#B79CFF",
      },
      keyframes: { marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } } },
      fontFamily: {
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"DM Sans Variable"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
