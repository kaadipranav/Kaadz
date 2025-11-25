/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix-green': '#00ff41',
        'dark-green': '#003b00',
        'cyber-black': '#0a0a0a',
        'cyber-gray': '#111111',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Space Mono', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 65, 0.5)',
        'neon-green-lg': '0 0 40px rgba(0, 255, 65, 0.6)',
      },
    },
  },
  plugins: [],
}

