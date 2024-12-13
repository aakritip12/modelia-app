/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const colors = Object.freeze({
  'purple-light': '#eaddff',
  'pink-light': '#ef7a85',
  rust: '#e4572e',
  'yellow-mustard': '#E48F45',
  'yellow-gold': '#FFE6A9',
  'green-light': '#cee296',
  'green-dark': '#4F7936',
  'magenta-light': '#c53a63',
  coral: '#ff613e',
  'brown-light': '#DE8F5F',
});

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [...Object.keys(colors).map((colorName) => `bg-${colorName}`)],
  theme: {
    extend: {
      colors,
      animation: {
        'color-change': 'colorChange 3s forwards',
      },
      keyframes: {
        colorChange: {
          '0%': { backgroundColor: '#36BA98' },
          '100%': { backgroundColor: '#ffffff' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
