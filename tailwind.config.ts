import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: ["./src/app/**/*.{js,ts,jsx,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        page: "inset 0px 8px 24px 0px rgb(0 0 0 / 0.04)",
        nav: "0px 24px 24px -24px rgb(0 0 0 / 0.08)",
        in: "inset 0px 0px 36px 0px rgb(0 0 0 / 0.06)",
        out: "0px 8px 32px 12px rgb(0 0 0 / 0.04)",
      },
      textShadow: {
        sm: "0px 0px 10px rgb(0 0 0 / 0.07)",
        DEFAULT: "0px 0px 10px rgb(0 0 0 / 0.1)",
        lg: "0px 0px 10px rgb(0 0 0 / 0.15)",
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|border)-(gray|cyan|rose|violet|emerald|orange)-500/,
      variants: ["hover"],
    },
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-no-scrollbar"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "char-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
} satisfies Config;

export default config;
