import type { WordType, WordsList } from '@/types/Task'
import { it, describe, expect, vi, afterEach } from 'vitest'
import { generateWords } from '@/services/generateWords'
import { getMixedWords } from '@/helpers/getMixedWords'
import { generateUniqueList } from '@/helpers/generateUniqueList'

vi.mock('@/helpers/getMixedWords', () => {
	return {
		getMixedWords: vi.fn().mockImplementation(() => []),
	}
})

vi.mock('@/helpers/generateUniqueList', () => {
	return {
		generateUniqueList: vi.fn(),
	}
})

describe('#generateWords', () => {
	const mockList: WordsList = {
		three: ['cat', 'dog', 'fly'],
		four: ['bird', 'frog', 'lion'],
		five: ['apple', 'banana', 'cherry'],
		six: ['blabla', 'banana'],
	}

	afterEach(() => {
		vi.clearAllMocks()
	})

	it('returns an empty array when the type of word is not valid', () => {
		const result = generateWords(mockList, 'invalid-type' as WordType)
		expect(result).toEqual([])
	})

	it('calls generateUniqueList function when type is "three" with second argument of 10', () => {
		generateWords(mockList, 'three')
		expect(generateUniqueList).toHaveBeenCalledWith(mockList['three'], 10)
	})

	it('calls generateUniqueList function when type is "four" with second argument of 7', () => {
		generateWords(mockList, 'four')
		expect(generateUniqueList).toHaveBeenCalledWith(mockList['four'], 7)
	})

	it('calls getMixedWords function when type is "mix"', () => {
		generateWords(mockList, 'mix')
		expect(getMixedWords).toHaveBeenCalledWith(mockList)
	})

	it('calls generateUniqueList function when type is "mix" with second argument of 6', () => {
		generateWords(mockList, 'mix')
		expect(generateUniqueList).toHaveBeenCalledWith([], 6)
	})
})
