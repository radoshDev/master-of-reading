import { defineStore } from 'pinia'
import type {
	MainTask,
	TaskType,
	TasksScore,
	SyllableType,
	WordType,
	LetterType,
} from '@/types/Task'
import { computed, ref } from 'vue'
import { Syllable } from '@/services/Syllable'
import { generateWords } from '@/services/generateWords'
import { generateLetters } from '@/services/generateLetters'
import { useWordStore } from './wordStore'
import { TASKS_SCORE_STORAGE_KEY } from '@/constants'

export const tasks: Record<TaskType, MainTask> = {
	letters: {
		title: 'Букви',
		subtasks: {
			vowels: {
				title: 'Голосні',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/39.svg',
					name: 'jigglypuff',
				},
			},
			consonants: {
				title: 'Приголосні',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
					name: 'charmander',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/60.svg',
					name: 'poliwag',
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
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/33.svg',
					name: 'nidorino',
				},
			},
			consonantFirst: {
				title: 'Перша приголосна',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/134.svg',
					name: 'vaporeon',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/61.svg',
					name: 'poliwhirl',
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
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/85.svg',
					name: 'dodrio',
				},
			},
			four: {
				title: '4 букви',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/44.svg',
					name: 'ivysaur',
				},
			},
			five: {
				title: '5 букв',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/102.svg',
					name: 'exeggcute',
				},
			},
			mix: {
				title: 'Змішано',
				img: {
					src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/62.svg',
					name: 'poliwrath',
				},
			},
		},
		img: {
			src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg',
			name: 'venusaur',
		},
	},
}

const initialTasksScore: TasksScore = {
	letters: {
		vowels: { index: 0, result: 0, action: 'add', exercises: [] },
		consonants: { index: 0, result: 0, action: 'add', exercises: [] },
		mix: { index: 0, result: 0, action: 'add', exercises: [] },
	},
	syllables: {
		vowelFirst: { index: 0, result: 0, action: 'add', exercises: [] },
		consonantFirst: { index: 0, action: 'add', result: 0, exercises: [] },
		mix: { index: 0, result: 0, action: 'add', exercises: [] },
	},
	words: {
		three: { index: 0, result: 0, action: 'add', exercises: [] },
		four: { index: 0, result: 0, action: 'add', exercises: [] },
		five: { index: 0, result: 0, action: 'add', exercises: [] },
		mix: { index: 0, result: 0, action: 'add', exercises: [] },
	},
}

export const useTaskStore = defineStore('task', () => {
	const wordStore = useWordStore()
	const options = ref({ mute: false, upper: true, slideBack: false })
	const taskType = ref<TaskType>('letters')
	const selectedExercise = ref<Record<TaskType, string>>({
		letters: 'mix',
		syllables: 'mix',
		words: 'mix',
	})
	const showTask = ref(false)
	const storageTasksScore = JSON.parse(
		localStorage.getItem(TASKS_SCORE_STORAGE_KEY) || '0'
	)
	const tasksScore = ref<TasksScore>(storageTasksScore || initialTasksScore)

	const exerciseType = computed(() => selectedExercise.value[taskType.value])

	const exerciseScore = computed({
		get() {
			return tasksScore.value[taskType.value][exerciseType.value]
		},
		set(newExerciseScore) {
			tasksScore.value[taskType.value][exerciseType.value] = newExerciseScore
		},
	})

	const exerciseText = computed(() => {
		const exerciseIndex = exerciseScore.value.index
		return exerciseScore.value.exercises[exerciseIndex]
	})

	function setExerciseType(subTaskType: string) {
		selectedExercise.value[taskType.value] = subTaskType
	}

	function generateTask() {
		if (taskType.value === 'letters') {
			exerciseScore.value.exercises = generateLetters(
				exerciseType.value as LetterType
			)
		}
		if (taskType.value === 'syllables') {
			exerciseScore.value.exercises = new Syllable(
				exerciseType.value as SyllableType
			).generateSyllables(10)
		}
		if (taskType.value === 'words' && wordStore.words) {
			exerciseScore.value.exercises = generateWords(
				wordStore.words,
				exerciseType.value as WordType
			)
		}
	}

	function startTask() {
		exerciseScore.value.result = 0
		exerciseScore.value.index = 0
		exerciseScore.value.action = 'add'
		generateTask()
		showTask.value = true
	}

	function nextRound() {
		exerciseScore.value.index = 0
		generateTask()
		localStorage.setItem(
			TASKS_SCORE_STORAGE_KEY,
			JSON.stringify(tasksScore.value)
		)
	}

	return {
		options,
		showTask,
		taskType,
		tasksScore,
		selectedExercise,
		exerciseType,
		exerciseScore,
		exerciseText,
		setExerciseType,
		startTask,
		nextRound,
	}
})
