import clip from 'tailwind-clip-path';
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
		'outline-indigo-300',
		'outline-violet-300',
		'outline-purple-300',
		'outline-blue-300',
		'outline-sky-300',
		'outline-cyan-300',
		'outline-teal-300',
		'outline-emerald-300',
		'outline-green-300',
		'outline-lime-300',
		'outline-yellow-300',
		'outline-amber-300',
		'outline-orange-300',
		'outline-red-300',
		'outline-pink-300',
		'outline-rose-300',
		'outline-fuchsia-300',
		'outline-stone-300',
		'outline-slate-300',
		'outline-grey-300',
		'outline-zinc-300',
		'outline-neutral-300',
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
		'bg-indigo-100',
		'bg-violet-100',
		'bg-purple-100',
		'bg-blue-100',
		'bg-sky-100',
		'bg-cyan-100',
		'bg-teal-100',
		'bg-emerald-100',
		'bg-green-100',
		'bg-lime-100',
		'bg-yellow-100',
		'bg-amber-100',
		'bg-orange-100',
		'bg-red-100',
		'bg-pink-100',
		'bg-rose-100',
		'bg-fuchsia-100',
		'bg-stone-100',
		'bg-slate-100',
		'bg-grey-100',
		'bg-zinc-100',
		'bg-neutral-100',
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
		'border-neutral-300'
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#eff6ff',
					'100': '#dbeafe',
					'200': '#bfdbfe',
					'300': '#93c5fd',
					'400': '#60a5fa',
					'500': '#3b82f6',
					'600': '#2563eb',
					'700': '#1d4ed8',
					'800': '#1e40af',
					'900': '#1e3a8a',
					'950': '#172554'
				}
			},

			fontFamily: {
				customHeading: ['Roboto Slab'],
				madeWithSvelte: ['Dosis']
			},

			backgroundImage: {
				'hero-pattern': "url('/hexagons.svg')"
			},
			clipPath: {
				'semi-circle-ellipse': 'ellipse(50% 100% at 50% 100%)',
				'bottom-semi-circle-ellipse': 'ellipse(50% 100% at 50% 0%)'
			},
			keyframes: {
				bounceSlow: {
					'0%, 100%': { transform: 'translateY(10px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				bounceSlow: 'bounceSlow 2s infinite'
			}
		}
	},
	variants: {
		extend: {
			backgroundColor: ['group-hover'],
			borderColor: ['group-hover'],
			fill: ['group-hover'],
			stroke: ['group-hover']
		}
	},

	plugins: [clip]
} satisfies Config;
