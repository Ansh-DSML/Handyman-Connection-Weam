import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Matched to computed styles pulled from the live Beacon ledger site
        // (two-home-one-ledge-marketing.vercel.app) in Phase 7.
        "beacon-ink": "#17131F",
        "beacon-blue": "#003DA5",
        "beacon-yellow": "#FFD100",
        "beacon-bg": "#FAF9FD",
        "beacon-surface": "#FFFFFF",
        "beacon-border": "#E5E0F2",
        "beacon-muted": "#6B7280",
        "beacon-green": "#16A34A",
        "beacon-red": "#DC2626",
        "beacon-orange": "#EA580C",
      },
      fontFamily: {
        sans: ["var(--font-public-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      boxShadow: {
        beacon: "0 1px 2px rgba(23,19,31,.05), 0 14px 32px -16px rgba(23,19,31,.28)",
      },
    },
  },
  plugins: [],
};
export default config;
