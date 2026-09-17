/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF7F2',
          light: '#FFFDF9',
          cream: '#F5EFE6',
          warm: '#F1E9DE',
        },
        maroon: {
          DEFAULT: '#7A1C28',
          dark: '#54121A',
          light: '#8B2635',
          terracotta: '#9E3240',
          hover: '#661520',
        },
        blush: {
          DEFAULT: '#E8D3D3',
          light: '#F8F1F1',
          rose: '#D8BABA',
          border: '#DFC9C9',
        },
        sage: {
          DEFAULT: '#7D8B75',
          light: '#A3B19B',
          soft: '#DCE4D8',
          dark: '#586551',
        },
        charcoal: {
          DEFAULT: '#2C221E',
          dark: '#1E1B18',
          muted: '#5F514B',
          light: '#85756E',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          accent: '#C59B27',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'Sacramento', 'cursive'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(122, 28, 40, 0.08)',
        'card': '0 15px 35px -5px rgba(44, 34, 30, 0.07)',
        'polaroid': '0 12px 28px rgba(44, 34, 30, 0.12), 0 2px 4px rgba(44, 34, 30, 0.06)',
        'gold': '0 8px 25px -4px rgba(212, 175, 55, 0.25)',
        'maroon': '0 8px 25px -4px rgba(122, 28, 40, 0.35)',
      },
      borderRadius: {
        'blob-1': '60% 40% 70% 30% / 40% 50% 60% 50%',
        'blob-2': '40% 60% 50% 50% / 60% 30% 70% 40%',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(0.97)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
      },
    },
  },
  plugins: [],
};
