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
        'watchllm-purple': '#7c5cff',
        'watchllm-purple-light': '#9d7eff',
        'watchllm-purple-dark': '#5a3fd4',
        'bg-primary': '#0b1020',
        'bg-secondary': '#0f1628',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 20px hsla(var(--hue, 120), 100%, 50%, 0.5)',
        'neon-green-lg': '0 0 40px hsla(var(--hue, 120), 100%, 50%, 0.6)',
        'purple-glow': '0 0 20px rgba(124, 92, 255, 0.3)',
        'purple-glow-lg': '0 0 40px rgba(124, 92, 255, 0.4)',
      },
    },
  },
  plugins: [],
}

