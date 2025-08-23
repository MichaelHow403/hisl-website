/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'border': 'hsl(215 27% 16%)',
        'input': 'hsl(215 27% 16%)',
        'ring': 'hsl(180 100% 50%)',
        'background': 'hsl(230 35% 7%)',
        'foreground': 'hsl(0 0% 98%)',
        'primary': {
          DEFAULT: 'hsl(180 100% 50%)', // Cyan
          foreground: 'hsl(0 0% 9%)',
        },
        'secondary': {
          DEFAULT: 'hsl(210 100% 50%)', // Blue
          foreground: 'hsl(0 0% 98%)',
        },
        'muted': {
          DEFAULT: 'hsl(215 27% 16%)',
          foreground: 'hsl(217.9 10.6% 64.9%)',
        },
        'accent': {
          DEFAULT: 'hsl(215 27% 16%)',
          foreground: 'hsl(0 0% 98%)',
        },
        'card': {
          DEFAULT: 'hsl(230 25% 12%)',
          foreground: 'hsl(0 0% 98%)',
        },
        'popover': {
          DEFAULT: 'hsl(230 25% 12%)',
          foreground: 'hsl(0 0% 98%)',
        },
        'destructive': {
          DEFAULT: 'hsl(0 62.8% 30.6%)',
          foreground: 'hsl(0 0% 98%)',
        },
        'hisl-dark': '#0a0a0f',
        'hisl-gray': '#1a1a2e',
        'success': '#00ff00', // Green
        'warning': '#ffff00', // Yellow
        'error': '#ff0000', // Red
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

