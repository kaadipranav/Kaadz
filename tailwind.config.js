/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matrix-green': 'hsl(var(--hue, 120), 100%, 50%)',
        'dark-green': 'hsl(var(--hue, 120), 100%, 15%)',
        'cyber-black': '#0a0a0a',
        'cyber-gray': '#a0a0a0',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 20px hsla(var(--hue, 120), 100%, 50%, 0.5)',
        'neon-green-lg': '0 0 40px hsla(var(--hue, 120), 100%, 50%, 0.6)',
      },
    },
  },
  plugins: [],
}

