import type { TASK_TYPE } from '@/constants'

export type TaskType = keyof typeof TASK_TYPE

type Image = {
	src: string
	name: string
}

export type Task = {
	title: string
	img: Image
}

export type MainTask = Task & { subtasks: Record<string, Task> }

export type ExerciseScore = {
	earned: number
	exercises: string[]
	index: number
}

export type TasksScore = Record<TaskType, Record<string, ExerciseScore>>

export type SyllableType = 'mix' | 'vowelFirst' | 'consonantFirst'

export type WordHeader = 'three' | 'four' | 'five' | 'difficult'

export type WordsList = Record<WordHeader, string[]>

export type WordType = WordHeader | 'mix'

export type LetterType = 'vowels' | 'consonants' | 'mix'
