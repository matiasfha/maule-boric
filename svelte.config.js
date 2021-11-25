import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';
import svg from '@poppanator/sveltekit-svg';
import vercel from '@sveltejs/adapter-vercel';
import 'dotenv/config';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		mdsvex(mdsvexConfig)
	],

	kit: {
		adapter: vercel(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
		// Options are optional
			plugins: [svg()],
			optimizeDeps: {
				exclude: ['svelte-modals']
			}
		}
	}
};

export default config;
