/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dogWood:{
          light: '#D9BFBF',
          default: '#CBA6A6',
          dark: 'C49C9C',
        },
        taupe:"#7D4E57",
        night:"#121113",
        eerieBlack:"#222725",
        mossGreen: {
          light: "#9FAB91",
          default: "#899878",
          dark: "#707F5E",
        },
      },
      boxShadow: {
        'md': '7px 7px 7px -3px rgba(125, 78, 87, 0.4)',
      },
    },
  },
  plugins: [],
}
