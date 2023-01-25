import type { TaskType, SyllableType } from '@/types/Task'
import { Syllable } from './Syllable'

export const generateTask = (
	taskType: TaskType,
	exerciseType: string
): string[] => {
	if (taskType === 'letters') {
		return ['a', 'c']
	}
	if (taskType === 'syllables') {
		return new Syllable(exerciseType as SyllableType).generateSyllables(10)
	}
	return ['mama', 'tato']
}
