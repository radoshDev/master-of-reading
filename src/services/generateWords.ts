import type { WordsList, WordType, WordHeader } from '@/types/Task'
import { getRandomIndex } from '@/helpers/getRandomIndex'

export const generateWords = (list: WordsList, type: WordType): string[] => {
	const wordsList = { ...list } as Record<WordType, string[]>
	let exerciseLength = 5

	if (type === 'three') exerciseLength = 8
	if (type === 'four') exerciseLength = 6

	if (type === 'mix') {
		const mixArray: string[] = []
		for (const key in list) {
			mixArray.push(...list[key as WordHeader])
		}
		wordsList.mix = mixArray
	}

	const array: string[] = []
	let i = 0
	while (i < exerciseLength) {
		const word = wordsList[type][getRandomIndex(wordsList[type].length)]
		if (!array.includes(word)) {
			array.push(word)
			i++
		}
	}
	return array
}
