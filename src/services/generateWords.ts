import type { WordsList, WordType } from '@/types/Task'
import { getMixedWords } from '@/helpers/getMixedWords'
import { generateUniqueList } from '@/helpers/generateUniqueList'

export const generateWords = (list: WordsList, type: WordType): string[] => {
	const wordsList: Record<WordType, string[]> = { ...list, mix: [] }
	let exerciseLength = 6

	if (type === 'three') exerciseLength = 10
	if (type === 'four') exerciseLength = 7

	if (type === 'mix') {
		wordsList[type] = getMixedWords(list)
	}

	const words = wordsList[type]

	if (!words) return []

	return generateUniqueList(words, exerciseLength)
}
