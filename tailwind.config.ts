import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#faf8f5",
        ink: "#2c2825",
        sage: "#8b9a7d",
        stone: "#a39e97",
        /* Marketplace (Amazon/Flipkart style) */
        header: "#131921",
        headerHover: "#232f3e",
        primary: "#ff9900",
        primaryHover: "#e88b00",
        secondary: "#febd69",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        cardHover: "0 4px 16px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
