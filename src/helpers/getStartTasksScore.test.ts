import { it, describe, expect } from 'vitest'
import { getStartTasksScore } from './getStartTasksScore'

describe('getStartTasksScore', () => {
	it('returns an object with keys for each task', () => {
		const startTasksScore = getStartTasksScore()

		expect(startTasksScore).toHaveProperty('letters')
		expect(startTasksScore).toHaveProperty('syllables')
		expect(startTasksScore).toHaveProperty('words')
	})

	it('creates an object for each subtask within each task', () => {
		const startTasksScore = getStartTasksScore()

		expect(startTasksScore.letters).toHaveProperty('vowels')
		expect(startTasksScore.letters).toHaveProperty('consonants')
		expect(startTasksScore.letters).toHaveProperty('mix')

		expect(startTasksScore.syllables).toHaveProperty('vowelFirst')
		expect(startTasksScore.syllables).toHaveProperty('consonantFirst')
		expect(startTasksScore.syllables).toHaveProperty('mix')

		expect(startTasksScore.words).toHaveProperty('three')
		expect(startTasksScore.words).toHaveProperty('four')
		expect(startTasksScore.words).toHaveProperty('five')
		expect(startTasksScore.words).toHaveProperty('mix')
	})

	it('creates a default score object for each subtask', () => {
		const startTasksScore = getStartTasksScore()

		expect(startTasksScore.letters.vowels).toEqual({})

		expect(startTasksScore.syllables.vowelFirst).toEqual({})

		expect(startTasksScore.words.three).toEqual({})
	})
})
