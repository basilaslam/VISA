import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        'primary-100': '#ffcdd2',
        'primary-200': '#ef9a9a',
        'primary-300': '#e57373',
        'primary-400': '#ef5350',
        'primary-500': '#f44336',
        'primary-600': '#e53935',
        'primary-700': '#d32f2f',
        'primary-800': '#c62828',
        'primary-900': '#b71c1c',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
