import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#3B0A14",       // deep maroon-black, dark sections & headings
        ivory: "#FFF8E7",     // warm marigold-tinted cream background
        gold: "#D4AF37",      // bright traditional gold accent
        rosewood: "#8B1E3F",  // rich maroon-red (buttons, links)
        blush: "#F6D8A8",     // marigold/peach highlight backgrounds
        charcoal: "#4A2E2E",  // body text
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
