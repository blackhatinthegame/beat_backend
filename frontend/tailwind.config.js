/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0c0c0f',
        'background-secondary': '#121214',
        card: '#18181d',
        accent: '#e11d48'
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(168, 85, 247, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: []
};

