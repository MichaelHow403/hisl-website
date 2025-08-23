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
        'primary-foreground': '#000000',
        'secondary': '#0088ff', // Blue
        'secondary-foreground': '#ffffff',
        'muted': '#1a2234',
        'muted-foreground': '#a1a1aa',
        'hisl-dark': '#0a0a0f',
        'hisl-gray': '#1a1a2e',
        'foreground': '#f5f5f5',
        'background': '#0a0a0f',
        'card': '#111827',
        'card-foreground': '#f5f5f5',
        'border': '#1a2234',
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

