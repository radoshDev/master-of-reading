import { defineStore } from 'pinia'
import type {
	TaskType,
	TasksScore,
	SyllableType,
	WordType,
	LetterType,
	TasksType,
	ExerciseScore,
} from '@/types/Task'
import { computed, ref, reactive } from 'vue'
import { Syllable } from '@/services/Syllable'
import { generateWords } from '@/services/generateWords'
import { generateLetters } from '@/services/generateLetters'
import { useWordStore } from './wordStore'
import { TASKS_SCORE_STORAGE_KEY } from '@/constants'
import { getStartTasksScore } from '@/helpers/getStartTasksScore'

const initialTasksScore: TasksScore =
	JSON.parse(localStorage.getItem(TASKS_SCORE_STORAGE_KEY) || '0') ||
	getStartTasksScore()

export const useTaskStore = defineStore('task', () => {
	const wordStore = useWordStore()
	const options = ref({ mute: false, upper: true, slideBack: false })
	const taskType = ref<TaskType>('letters')
	const selectedExercise = reactive<TasksType>({
		letters: 'consonants',
		syllables: 'consonantFirst',
		words: 'three',
	})
	const showTask = ref(false)

	const tasksScore = reactive<TasksScore>(initialTasksScore)

	const exerciseType = computed(() => selectedExercise[taskType.value])

	const exerciseScore = computed<ExerciseScore>({
		get() {
			// @ts-ignore
			return tasksScore[taskType.value][exerciseType.value]
		},
		set(newExerciseScore) {
			// @ts-ignore
			tasksScore[taskType.value][exerciseType.value] = newExerciseScore
		},
	})

	const exerciseText = computed(() => {
		const exerciseIndex = exerciseScore.value.index
		return exerciseScore.value.exercises[exerciseIndex]
	})

	function setExerciseType(subTaskType: string) {
		// @ts-ignore
		selectedExercise[taskType.value] = subTaskType
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
		localStorage.setItem(TASKS_SCORE_STORAGE_KEY, JSON.stringify(tasksScore))
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
