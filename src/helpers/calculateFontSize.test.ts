import { calculateFontSize } from '@/helpers/calculateFontSize'
import { it, describe, expect } from 'vitest'

describe('calculateFontSize', () => {
	it('returns 45vw for a word with 1 characters', () => {
		expect(calculateFontSize(1)).toBe('min(1200px, 60vw)')
	})
	it('returns 45vw for a word with 2 characters', () => {
		expect(calculateFontSize(2)).toBe('min(600px, 45vw)')
	})

	it('returns 39vw for a word with 3 characters', () => {
		expect(calculateFontSize(3)).toBe('min(400px, 39vw)')
	})

	it('returns 30vw for a word with 4 characters', () => {
		expect(calculateFontSize(4)).toBe('min(300px, 30vw)')
	})

	it('returns 23vw for a word with 5 characters', () => {
		expect(calculateFontSize(5)).toBe('min(240px, 23vw)')
	})

	it('returns 19vw for a word with 6 characters', () => {
		expect(calculateFontSize(6)).toBe('min(200px, 19vw)')
	})

	it('returns 16vw for a word with 7 characters', () => {
		expect(calculateFontSize(7)).toBe('min(171px, 16vw)')
	})

	it('returns 14vw for a word with 8 characters', () => {
		expect(calculateFontSize(8)).toBe('min(150px, 14vw)')
	})

	it('returns 1rem for words with more than 8 characters', () => {
		expect(calculateFontSize(9)).toBe('1rem')
		expect(calculateFontSize(10)).toBe('1rem')
	})
})
