// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  colors: {
    transparent: 'transparent',
    current: 'currentColor',
    black: colors.black,
    white: colors.white,
    gray: colors.gray,
    emerald: colors.emerald,
    indigo: colors.indigo,
    yellow: colors.yellow,
  },
  plugins: [require('tailwindcss-radix'), require('@tailwindcss/forms')],
}
