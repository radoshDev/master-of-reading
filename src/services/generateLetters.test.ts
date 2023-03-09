import { consonants, vowels } from '@/constants'
import { generateUniqueList } from '@/helpers/generateUniqueList'
import { generateLetters } from '@/services/generateLetters'
import type { LetterType } from '@/types/Task'
import { it, describe, expect, vi, afterEach } from 'vitest'

vi.mock('@/helpers/generateUniqueList', () => {
	return {
		generateUniqueList: vi.fn(),
	}
})

describe('#generateLetters', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('returns an empty array when the type of letter is not valid', () => {
		const result = generateLetters('invalid-type' as LetterType)
		expect(result).toEqual([])
	})

	it('returns a list of 5 vowels when type is "vowels"', () => {
		generateLetters('vowels')
		expect(generateUniqueList).toHaveBeenCalledWith(vowels, 5)
	})

	it('returns a list of 5 consonants when type is "consonants"', () => {
		generateLetters('consonants')
		expect(generateUniqueList).toHaveBeenCalledWith(consonants, 5)
	})

	it('calls generateUniqueList function with the correct arguments', () => {
		generateLetters('mix')
		expect(generateUniqueList).toHaveBeenCalledWith(
			[...consonants, ...vowels],
			5
		)
	})
})
