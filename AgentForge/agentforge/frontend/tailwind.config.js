/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#09090f",
        surface: "#111118",
        accent: "#6c63ff",
        success: "#43e8b0",
        warning: "#ffb547",
        danger: "#ff6584"
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui"],
        body: ["DM Sans", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(108,99,255,0.35), 0 10px 30px rgba(108,99,255,0.12)"
      }
    }
  },
  plugins: []
};

