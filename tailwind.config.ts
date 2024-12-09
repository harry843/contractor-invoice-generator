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
		'dark:hover:bg-emerald-700',
		'bg-red-600',
		'bg-slate-600',
		'outline-indigo-600',
		'outline-violet-600',
		'outline-purple-600',
		'outline-blue-600',
		'outline-sky-600',
		'outline-cyan-600',
		'outline-teal-600',
		'outline-emerald-600',
		'outline-green-600',
		'outline-lime-600',
		'outline-yellow-600',
		'outline-amber-600',
		'outline-orange-600',
		'outline-red-600',
		'outline-pink-600',
		'outline-rose-600',
		'outline-fuchsia-600',
		'outline-stone-600',
		'outline-slate-600',
		'outline-grey-600',
		'outline-zinc-600',
		'outline-neutral-600',
		'border-indigo-300',
		'border-violet-300',
		'border-purple-300',
		'border-blue-300',
		'border-sky-300',
		'border-cyan-300',
		'border-teal-300',
		'border-emerald-300',
		'border-green-300',
		'border-lime-300',
		'border-yellow-300',
		'border-amber-300',
		'border-orange-300',
		'border-red-300',
		'border-pink-300',
		'border-rose-300',
		'border-fuchsia-300',
		'border-stone-300',
		'border-slate-300',
		'border-grey-300',
		'border-zinc-300',
		'border-neutral-300',
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
