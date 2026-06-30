import type { Config } from "tailwindcss";

/**
 * Barro — Warm Heritage design system.
 * Palette anchored on ivory/parchment canvas, ink text, antique-gold + oxblood accents.
 * Type: Cormorant (display) · EB Garamond (serif body) · Jost (tracked sans labels).
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
        "2xl": "5rem",
      },
      screens: {
        "2xl": "1480px",
      },
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F4EFE6",
          50: "#FBF9F4",
          100: "#FAF7F0",
        },
        cream: "#FAF7F0",
        parchment: {
          DEFAULT: "#E7DECE",
          dark: "#DBCFB9",
          deep: "#CFC0A4",
        },
        ink: {
          DEFAULT: "#1E1A16",
          soft: "#3A332B",
          muted: "#6B6157",
          faint: "#9A9084",
        },
        oxblood: {
          DEFAULT: "#5A2A27",
          light: "#7A3A36",
          dark: "#42201E",
        },
        gold: {
          DEFAULT: "#A9893F",
          light: "#C4A862",
          bright: "#D4B870",
          dark: "#866A2E",
          pale: "#E4D4A8",
        },
        espresso: {
          DEFAULT: "#241C15",
          light: "#332820",
        },
        stone: "#8C8174",
        line: "rgba(30, 26, 22, 0.14)",
        "line-strong": "rgba(30, 26, 22, 0.28)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        serif: ["var(--font-serif)", "EB Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "display-sm": ["clamp(2.2rem, 5vw, 3.4rem)", { lineHeight: "1.04", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2.8rem, 7vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.015em" }],
        "display-lg": ["clamp(3.4rem, 10vw, 8.5rem)", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
        "display-xl": ["clamp(4rem, 14vw, 13rem)", { lineHeight: "0.9", letterSpacing: "-0.025em" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
        luxe: "0.16em",
        wide2: "0.24em",
        widest2: "0.34em",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
        prose2: "68ch",
      },
      spacing: {
        "section": "clamp(5rem, 12vw, 11rem)",
        "section-sm": "clamp(3.5rem, 8vw, 7rem)",
      },
      borderRadius: {
        xs: "2px",
        sm: "3px",
      },
      boxShadow: {
        luxe: "0 40px 80px -40px rgba(30, 26, 22, 0.45)",
        card: "0 30px 60px -35px rgba(30, 26, 22, 0.5)",
        "card-hover": "0 50px 90px -40px rgba(30, 26, 22, 0.55)",
        soft: "0 18px 40px -28px rgba(30, 26, 22, 0.4)",
        inset: "inset 0 0 0 1px rgba(30, 26, 22, 0.1)",
        gold: "0 0 0 1px rgba(169, 137, 63, 0.45)",
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)",
        expo: "cubic-bezier(0.87, 0, 0.13, 1)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
        "1400": "1400ms",
        "1500": "1500ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scroll-indicator": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "50%": { transform: "scaleY(1)", transformOrigin: "top" },
          "50.01%": { transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "marquee-reverse": "marquee-reverse 38s linear infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        float: "float 7s ease-in-out infinite",
        "fade-in": "fade-in 1s ease forwards",
        "scroll-indicator": "scroll-indicator 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
