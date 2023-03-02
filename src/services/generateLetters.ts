import type { LetterType } from '@/types/Task'
import { consonants, vowels } from '@/constants'
import { generateUniqueList } from '@/helpers/generateUniqueList'

export const generateLetters = (type: LetterType): string[] => {
	const lettersList: Record<LetterType, string[]> = {
		consonants: consonants,
		vowels: vowels,
		mix: [...consonants, ...vowels],
	}
	const letters = lettersList[type]

	if (!letters) return []

	return generateUniqueList(letters, 5)
}
