import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'selector',
	separator: '_',
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
          'secondary-reversed': colors.slate[400],
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
          dark: colors.slate[700],
        },
        surface: {
          light: colors.slate[50],
          lightest: colors.white,
          dark: colors.slate[700],
          darkest: colors.slate[900],
        },
      },
			fontFamily: {
        sans: [ 'Inter Variable', ...defaultTheme.fontFamily.sans ],
        display: [ 'Lexend Variable', ...defaultTheme.fontFamily.sans ],
      },
      height: {
        'input': '2.5rem',
        'input-lg': '3rem',
      },
      lineHeight: {
        'open': "1.75",
      },
		}
	},

	plugins: [typography, forms]
} as Config;
