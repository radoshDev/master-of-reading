import type { WordsList, WordHeader } from '@/types/Task'

export const getMixedWords = (wordsList: WordsList): string[] => {
	const mixArray: string[] = []

	for (const key in wordsList) {
		mixArray.push(...wordsList[key as WordHeader])
	}

	return mixArray
}
