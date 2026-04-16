import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#0D0D0D",
        ivory: "#FAF7F2",
        blush: "#F5E6E8",
        gold: {
          DEFAULT: "#C9A84C",
          hover: "#A8873A",
          light: "#EDD98A",
          muted: "#D4BC7D",
        },
        rose: {
          deep: "#8B2635",
          soft: "#E8C5CB",
        },
        plum: {
          DEFAULT: "#4A1942",
          light: "#7A3A72",
        },
        taupe: "#9E8E82",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        display: ["var(--font-cormorant)", "serif"],
        heading: ["Playfair Display", "serif"],
        body: ["var(--font-geist-sans)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C9A84C 0%, #EDD98A 50%, #A8873A 100%)",
        "dark-gradient": "linear-gradient(180deg, #0D0D0D 0%, #1A1010 100%)",
        "blush-gradient": "linear-gradient(135deg, #FAF7F2 0%, #F5E6E8 100%)",
      },
      boxShadow: {
        gold: "0 4px 20px rgba(201, 168, 76, 0.25)",
        "gold-lg": "0 8px 40px rgba(201, 168, 76, 0.35)",
        soft: "0 2px 16px rgba(158, 142, 130, 0.12)",
        card: "0 4px 24px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out",
        "fade-in": "fadeIn 0.4s ease-in-out",
        shimmer: "shimmer 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Updated for smoother flow
        float: "float 3s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        shimmer: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" }, // Reduced to 0.4 for a more pronounced "shimmer" effect
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
