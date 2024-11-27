import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	safelist: [
		'bg-indigo-600',
		'hover:bg-indigo-800',
		'dark:bg-indigo-600',
		'dark:hover:bg-indigo-700',
		'bg-emerald-600',
		'hover:bg-emerald-800',
		'dark:bg-emerald-600',
		'dark:hover:bg-emerald-700'
	  ],

	theme: {
		extend: {
			fontFamily: {
				customHeading: ['Roboto Slab'],
			}
		}
	},

	plugins: [typography, forms]
} satisfies Config;
