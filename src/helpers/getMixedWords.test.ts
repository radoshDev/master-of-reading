import { it, describe, expect } from 'vitest'
import { getMixedWords } from '@/helpers/getMixedWords'
import type { WordsList } from '@/types/Task'

describe('#getMixedWords', () => {
	it('returns an empty array when all lists are empty', () => {
		const wordsList: WordsList = {
			three: [],
			four: [],
			five: [],
			six: [],
		}
		const mixedWords = getMixedWords(wordsList)
		expect(mixedWords).toEqual([])
	})

	it('returns a mixed array of words when all lists have words', () => {
		const wordsList: WordsList = {
			three: ['dog', 'cat'],
			four: ['bird', 'fish'],
			five: ['horse', 'zebra'],
			six: ['blabla', 'someth'],
		}
		const mixedWords = getMixedWords(wordsList)
		expect(mixedWords).toContain('dog')
		expect(mixedWords).toContain('cat')
		expect(mixedWords).toContain('bird')
		expect(mixedWords).toContain('fish')
		expect(mixedWords).toContain('horse')
		expect(mixedWords).toContain('zebra')
	})

	it('returns a mixed array of words when some lists are empty', () => {
		const wordsList: WordsList = {
			three: ['dog', 'cat'],
			four: [],
			five: ['horse', 'zebra'],
			six: [],
		}
		const mixedWords = getMixedWords(wordsList)
		expect(mixedWords).toContain('dog')
		expect(mixedWords).toContain('cat')
		expect(mixedWords).toContain('horse')
		expect(mixedWords).toContain('zebra')
	})
})
