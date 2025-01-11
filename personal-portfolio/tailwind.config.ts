import type { Config } from "tailwindcss";

export default {
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
        'light-green': '#66FF00',
      },
      boxShadow: {
        'soft-bottom': '1px 0 1px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'roboto': 'inter',
        'mntsrt': 'montserrat'
      }
    },
  },
  plugins: [],
} satisfies Config;
