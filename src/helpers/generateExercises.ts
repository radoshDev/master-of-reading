import { generateLetters } from '@/services/generateLetters'
import { generateWords } from '@/services/generateWords'
import { Syllable } from '@/services/Syllable'
import type {
	TasksType,
	WordType,
	WordsList,
	LetterType,
	SyllableType,
} from '@/types/Task'

type ExerciseType<T, K extends keyof T> = T[K]

export const generateExercises = <T extends keyof TasksType>(
	taskType: T,
	exerciseType: ExerciseType<TasksType, T>,
	words?: WordsList | null
) => {
	if (taskType === 'letters') {
		return generateLetters(exerciseType as LetterType)
	}
	if (taskType === 'syllables') {
		return new Syllable(exerciseType as SyllableType).generateSyllables(10)
	}
	if (taskType === 'words' && words) {
		return generateWords(words, exerciseType as WordType)
	}
	return []
}
