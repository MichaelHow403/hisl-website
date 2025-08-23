/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#00ffff', // Cyan
        'secondary': '#0088ff', // Blue
        'hisl-dark': '#0a0a0f',
        'hisl-gray': '#1a1a2e',
        'success': '#00ff00', // Green
        'warning': '#ffff00', // Yellow
        'error': '#808080', // Gray
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.2 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

