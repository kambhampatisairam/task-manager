/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f5f5f0',
          100: '#e8e8e0',
          200: '#d0d0c4',
          300: '#b0b0a0',
          400: '#888878',
          500: '#666658',
          600: '#4a4a3e',
          700: '#343428',
          800: '#1e1e18',
          900: '#0f0f0c',
        },
        lime: {
          400: '#c8f135',
          500: '#b4e020',
          600: '#96c010',
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-up': 'fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pop: 'pop 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-12px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.92)' },
          '60%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
