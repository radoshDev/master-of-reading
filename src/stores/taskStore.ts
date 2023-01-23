import { defineStore } from 'pinia'
import type { MainTask, TaskType, TasksScore } from '@/types/Task'
import { ref } from 'vue'

export const tasks: Record<TaskType, MainTask> = {
	letters: {
		title: 'Букви',
		subtasks: {
			vowels: {
				title: 'Голосні',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
					name: 'bulbasaur',
				},
			},
			consonants: {
				title: 'Приголосні',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
					name: 'ivysaur',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
					name: 'venusaur',
				},
			},
		},
		img: {
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
			name: 'bulbasaur',
		},
	},
	syllables: {
		title: 'Склади',
		subtasks: {
			vowelFirst: {
				title: 'Перша голосна',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
					name: 'bulbasaur',
				},
			},
			consonantFirst: {
				title: 'Перша приголосна',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
					name: 'ivysaur',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
					name: 'venusaur',
				},
			},
		},
		img: {
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
			name: 'ivysaur',
		},
	},
	words: {
		title: 'Слова',
		subtasks: {
			three: {
				title: '3 букви',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
					name: 'bulbasaur',
				},
			},
			four: {
				title: '4 букви',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
					name: 'ivysaur',
				},
			},
			five: {
				title: '5 букв',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
					name: 'venusaur',
				},
			},
		},
		img: {
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
			name: 'venusaur',
		},
	},
}

export const useTaskStore = defineStore('task', () => {
	const selectedExercise = ref<Record<TaskType, string>>({
		letters: 'mix',
		syllables: 'mix',
		words: 'mix',
	})
	const showTask = ref(false)
	const tasksScore = ref<TasksScore>({
		letters: {
			vowels: { index: 0, earned: 0, exercises: ['A', 'B'] },
			consonants: { index: 0, earned: 0, exercises: [] },
			mix: { index: 0, earned: 0, exercises: [] },
		},
		syllables: {
			vowelFirst: { index: 0, earned: 0, exercises: [] },
			consonantFirst: { index: 0, earned: 0, exercises: [] },
			mix: { index: 0, earned: 0, exercises: ['AB', 'CA', 'BA'] },
		},
		words: {},
	})

	function setExerciseType(type: TaskType, subTaskType: string) {
		selectedExercise.value[type] = subTaskType
	}
	return { showTask, selectedExercise, tasksScore, setExerciseType }
})
