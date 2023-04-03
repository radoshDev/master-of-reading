import type { Tasks } from '@/types/Task'

export const POKEMONS_STORAGE_KEY = 'pokemons'
export const TASKS_SCORE_STORAGE_KEY = 'tasksScore'

export const POKEMONS_AMOUNT = 630

export const ROUTE_NAMES = {
	home: 'home',
	about: 'about',
	task: 'task',
	pokemons: 'pokemons',
	pokemon: 'pokemon',
	notFound: 'not-found',
} as const

export const vowels = ['а', 'е', 'о', 'у', 'і', 'и', 'я', 'ю', 'є', 'ї']
export const consonants = [
	'б',
	'в',
	'г',
	'ґ',
	'д',
	'ж',
	'з',
	'й',
	'к',
	'л',
	'м',
	'н',
	'п',
	'р',
	'с',
	'т',
	'ф',
	'х',
	'ц',
	'ч',
	'ш',
	'щ',
]

export const TASKS: Tasks = {
	letters: {
		title: 'Букви',
		subtasks: {
			vowels: {
				title: 'Голосні',
				img: {
					pokemonId: 39,
					name: 'jigglypuff',
				},
			},
			consonants: {
				title: 'Приголосні',
				img: {
					pokemonId: 4,
					name: 'charmander',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					pokemonId: 60,
					name: 'poliwag',
				},
			},
		},
		img: {
			pokemonId: 1,
			name: 'bulbasaur',
		},
	},
	syllables: {
		title: 'Склади',
		subtasks: {
			vowelFirst: {
				title: 'Перша голосна',
				img: {
					pokemonId: 33,
					name: 'nidorino',
				},
			},
			consonantFirst: {
				title: 'Перша приголосна',
				img: {
					pokemonId: 134,
					name: 'vaporeon',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					pokemonId: 61,
					name: 'poliwhirl',
				},
			},
		},
		img: {
			pokemonId: 2,
			name: 'ivysaur',
		},
	},
	words: {
		title: 'Слова',
		subtasks: {
			three: {
				title: '3 букви',
				img: {
					pokemonId: 85,
					name: 'dodrio',
				},
			},
			four: {
				title: '4 букви',
				img: {
					pokemonId: 44,
					name: 'ivysaur',
				},
			},
			five: {
				title: '5 букв',
				img: {
					pokemonId: 102,
					name: 'exeggcute',
				},
			},
			six: {
				title: '6 букв',
				img: {
					pokemonId: 73,
					name: 'tentacruel',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					pokemonId: 62,
					name: 'poliwrath',
				},
			},
		},
		img: {
			pokemonId: 3,
			name: 'venusaur',
		},
	},
}
