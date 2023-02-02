import type { LetterType } from '@/types/Task'
import { consonants, vowels } from '@/constants'
import { getRandomIndex } from '@/helpers/getRandomIndex'

export const generateLetters = (type: LetterType): string[] => {
	const lettersList: Record<LetterType, string[]> = {
		consonants: consonants,
		vowels: vowels,
		mix: [...consonants, ...vowels],
	}
	const array: string[] = []
	let i = 0
	while (i < 5) {
		const word = lettersList[type][getRandomIndex(lettersList[type].length)]
		if (!array.includes(word)) {
			array.push(word)
			i++
		}
	}
	return array
}
