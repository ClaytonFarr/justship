/* eslint-disable @typescript-eslint/no-require-imports */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
	separator: '_',
	content: ['./src/**/*.{svelte,js,ts,html}'],
	theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        sans: [ 'Inter Variable', ...defaultTheme.fontFamily.sans ],
      },
      fontSize: {
        sm: '0.9375rem', // 15px
        xs: '0.875rem', // 14px
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
