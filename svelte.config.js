import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';

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
		})
	}
};

export default config;
