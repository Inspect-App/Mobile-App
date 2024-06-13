/** @type {import('tailwindcss').Config} */

const colors = {
  danger: {},
  warning: {},
  success: {},
  light: {
    50: '#FFFFFF',
    100: '#F5F0F0',
    200: '#E5DBDB',
    800: '#8A6161',
    900: '#876363',
    950: '#171212',
  },
  dark: {
    50: '#171212',
    100: '#382929',
    200: '#261C1C',
    800: 'BA9C9C',
    900: '#B89E9E',
    950: '#FFFFFF',
  },
}

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
