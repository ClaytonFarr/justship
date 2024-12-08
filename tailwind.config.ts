import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import tailwindcssAnimate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // darkMode: ['class'],
  darkMode: 'selector',
  safelist: ['dark'],
  separator: '_', // necessary for pug syntax
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem', // px-6
        sm: '2rem', // px-8
        md: '4rem', // px-16
      },
      maxWidth: '80rem', // max-w-7xl
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // TODO: replace earlier custom styles with shadcn styles as appropriate

      // earlier custom styles
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
        display: ['Lexend Variable', ...defaultTheme.fontFamily.sans],
      },
      height: {
        input: '2.5rem',
        'input-lg': '3rem',
      },
      lineHeight: {
        open: '1.75',
      },

      colors: {
        // earlier custom styles
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
          // DEFAULT: colors.slate[300],
          DEFAULT: 'hsl(var(--input) / <alpha-value>)',
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

        // shadcn styles
        border: 'hsl(var(--border) / <alpha-value>)',
        // input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--bits-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--bits-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [typography, forms, tailwindcssAnimate],
} as Config
