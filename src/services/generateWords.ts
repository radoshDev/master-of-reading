import type { WordsList, WordType } from '@/types/Task'
import { getRandomIndex } from '@/helpers/getRandomIndex'
import { getMixedWords } from '@/helpers/getMixedWords'

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

	if (words.length <= exerciseLength) return words

	const selectedWords: Set<string> = new Set()

	while (selectedWords.size !== exerciseLength) {
		const randomIndex = getRandomIndex(words.length)
		const word = words[randomIndex]

		if (selectedWords.has(word)) continue

		selectedWords.add(word)
	}

	return Array.from(selectedWords)
}
