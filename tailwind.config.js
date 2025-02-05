/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary, #E50914)", // Azul 500 como fallback
          50: "var(--color-primary-50, #FCAAAE)",
          100: "var(--color-primary-100, #FB969B)",
          200: "var(--color-primary-200, #F96F76)",
          300: "var(--color-primary-300, #F84851)",
          400: "var(--color-primary-400, #F6212B)",
          500: "var(--color-primary-500, #E50914)", // Fallback si la variable no está definida
          600: "var(--color-primary-600, #AF070F)",
          700: "var(--color-primary-700, #79050B)",
          800: "var(--color-primary-800, #430306)",
          900: "var(--color-primary-900, #0D0101)",
        },
      }
    },
  },
  plugins: [],
}

