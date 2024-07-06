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
          active: colors.sky[700],
        },
        content: {
          heading: colors.slate[900],
          'heading-reversed': colors.white,
          body: colors.slate[800],
          'body-reversed': colors.slate[100],
          secondary: colors.slate[500],
          'secondary-reversed': colors.slate[300],
          tertiary: colors.slate[400],
          'tertiary-reversed': colors.slate[400],
        },
        input: {
          dark: colors.slate[900],
          DEFAULT: colors.slate[300],
          light: colors.slate[200],
        },
        rule: {
          DEFAULT: colors.slate[500],
          light: colors.slate[200],
        },
        surface: {
          light: colors.slate[50],
          lightest: colors.white
        },
      },
      fontFamily: {
        sans: [ 'Inter Variable', ...defaultTheme.fontFamily.sans ],
        display: [ 'Lexend Variable', ...defaultTheme.fontFamily.sans ],
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
