import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['"Work Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#FBE843', // adjust to your theme
        secondary: '#FB923C', // adjust to your theme
        'black-100': '#1a1a1a',
        'black-200': '#0a0a0a',
        'white-100': '#ffffff',
      },
      boxShadow: {
        100: '4px 4px 0px black',
        200: '6px 6px 0px black',
        300: '8px 8px 0px black',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [],
}
export default config
