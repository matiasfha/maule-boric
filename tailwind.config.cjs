const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				yellow: '#dbf87b',
				green: '#094c68',
				lightGreen: '#59c885',
				blue: '#70e7d3',
				'mindaro': {
					DEFAULT: '#DBF87B',
					'50': '#FFFFFF',
					'100': '#FFFFFF',
					'200': '#FBFEEF',
					'300': '#F0FCC8',
					'400': '#E6FAA2',
					'500': '#DBF87B',
					'600': '#CCF546',
					'700': '#BEF210',
					'800': '#96C00A',
					'900': '#6D8B07'
				},
			}
		},
		fontFamily: {
			sans: ['Roboto Slab', 'sans-serif'],
			serif: ['Roboto Slab', 'serif'],
		},
	},

	plugins: [
		  require('tailwindcss-textshadow')
	]
};

module.exports = config;
