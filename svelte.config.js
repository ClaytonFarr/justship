import adapter from '@sveltejs/adapter-vercel'
import { sveltePreprocess } from 'svelte-preprocess'
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		pug: true,
		plugins: [tailwindcss(), autoprefixer()],
	}),
	kit: {
		adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
		}),
		alias: {
			$actions: path.resolve('./src/lib/actions'),
			$components: path.resolve('./src/lib/components'),
			$utils: path.resolve('./src/lib/utils'),
			$hooks: path.resolve('./src/lib/hooks'),
		},
	},
	compilerOptions: {
		// hide warning from pug syntax
		warningFilter: ({ code }) => code != 'attribute_quoted',
	},
};

export default config;
