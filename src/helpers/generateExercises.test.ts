import { generateLetters } from '@/services/generateLetters'
import { Syllable } from '@/services/Syllable'
import { generateWords } from '@/services/generateWords'
import { it, describe, expect, vi, afterEach } from 'vitest'
import { generateExercises } from './generateExercises'
import type { WordsList } from '@/types/Task'

vi.mock('@/services/generateLetters', () => {
	return {
		generateLetters: vi.fn().mockReturnValue('mock'),
	}
})
vi.mock('@/services/Syllable', () => {
	return {
		Syllable: vi.fn().mockReturnValue({
			generateSyllables: vi.fn().mockReturnValue('mock'),
		}),
	}
})
vi.mock('@/services/generateWords', () => {
	return {
		generateWords: vi.fn().mockReturnValue('mock'),
	}
})

describe('#generateExercises', () => {
	afterEach(() => {
		vi.clearAllMocks()
	})

	it('should call #generateLetters when type is "letters"', () => {
		const result = generateExercises('letters', 'consonants')
		expect(result).toBe('mock')
		expect(generateLetters).toBeCalledWith('consonants')
	})
	it('should call #Syllable when type is "syllables"', () => {
		const result = generateExercises('syllables', 'consonantFirst')
		expect(Syllable).toBeCalledWith('consonantFirst')
		expect(result).toBe('mock')
	})
	it('should call #generateWords when type is "words" and wordsList is truthy', () => {
		const result = generateExercises('words', 'three', {} as WordsList)
		expect(generateWords).toBeCalled()
		expect(result).toBe('mock')
	})
	it('should not call #generateWords when type is "words" and wordsList is null', () => {
		const result = generateExercises('words', 'three', null)
		expect(generateWords).not.toBeCalled()
		expect(result).toStrictEqual([])
	})
	it('should return empty array when type in invalid', () => {
		const result = generateExercises('invalid' as any, 'three')
		expect(generateLetters).not.toBeCalled()
		expect(Syllable).not.toBeCalled()
		expect(generateWords).not.toBeCalled()
		expect(result).toStrictEqual([])
	})
})
