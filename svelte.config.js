import adapter from '@sveltejs/adapter-auto'
import { sveltePreprocess } from 'svelte-preprocess'
import path from 'path'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
      pug: true,
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
			$util: path.resolve('./src/lib/util')
		}
	}
};

export default config;
