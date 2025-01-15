import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			'light-green': '#66FF00'
  		},
  		boxShadow: {
  			'soft-bottom': '1px 0 1px rgba(0, 0, 0, 0.2), 0 0 1px rgba(0, 0, 0, 0.1)'
  		},
  		fontFamily: {
  			roboto: 'inter',
  			mntsrt: 'montserrat'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	},
  	keyframes: {
  		breathing: {
  			'0%, 100%': {
  				transform: 'scale(1) translate(-20px, -20px)',
  				opacity: '0.3'
  			},
  			'25%': {
  				transform: 'scale(1.15) translate(20px, -20px)',
  				opacity: '0.25'
  			},
  			'50%': {
  				transform: 'scale(1) translate(20px, -20px)',
  				opacity: '0.35'
  			},
  			'75%': {
  				transform: 'scale(0.85) translate(20px, 20px)',
  				opacity: '0.25'
  			}
  		}
  	},
  	animation: {
  		breathing: 'breathing 10s ease-in-out infinite'
  	}
  },
  
  plugins: [require("tailwindcss-animate"), addVariablesForColors,],
  
} satisfies Config;


function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}