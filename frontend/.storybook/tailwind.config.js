/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // include all React + TS files
  ],
  darkMode: "class", // enables dark mode via a class toggle
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a78bfa", // light purple
          DEFAULT: "#8b5cf6", // medium purple
          dark: "#6d28d9", // deep purple
        },
        accent: {
          blue: "#3b82f6", // blue gradient accent
          purple: "#9333ea", // complementary purple
        },
        background: {
          dark: "#0f0f1a",
          darker: "#090914",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(139, 92, 246, 0.4)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.4)",
      },
      backgroundImage: {
        "gradient-purple-blue":
          "linear-gradient(to right, #8b5cf6, #3b82f6, #8b5cf6)",
        "radial-glow":
          "radial-gradient(circle at center, rgba(139,92,246,0.3), rgba(15,15,26,1))",
      },
      animation: {
        "pulse-slow": "pulse 6s ease-in-out infinite",
        "spin-slow": "spin 6s linear infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
