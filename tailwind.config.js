/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
const config = {
	separator: '_',
	content: ['./src/**/*.{svelte,js,ts,html}'],
	theme: {
    extend: {
      colors: {
        action: {
          DEFAULT: colors.sky[600],
          hover: colors.sky[500],
          active: colors.sky[400],
        }
      },
      fontFamily: {
        sans: [ 'Inter Variable', ...defaultTheme.fontFamily.sans ],
      },
      fontSize: {
        sm: '0.9375rem', // 15px
        xs: '0.875rem', // 14px
      },
      height: {
        'input': '2.5rem',
        'input-lg': '3rem',
      },
      lineHeight: {
        'open': 1.75,
      },
    },
  },
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
	],
};

export default config;
