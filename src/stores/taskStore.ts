import { defineStore } from 'pinia'
import type { Task, TaskType } from '@/types/Task'

export const useTaskStore = defineStore('task', () => {
	const tasks: Record<TaskType, Task> = {
		letters: {
			title: 'Букви',
			img: {
				src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
				name: 'bulbasaur',
			},
		},
		syllables: {
			title: 'Склади',
			img: {
				src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
				name: 'ivysaur',
			},
		},
		words: {
			title: 'Слова',
			img: {
				src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
				name: 'venusaur',
			},
		},
	}

	return { tasks }
})
