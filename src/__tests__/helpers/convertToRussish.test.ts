import { convertToRussish } from '@/helpers/convertToRussish'
import { it, describe, expect } from 'vitest'

describe('convertToRussish', () => {
	it('should return empty string if exception is passed', () => {
		const exceptionWords = ['ця', 'до', 'со', 'ко', 'го', 'щи', 'фи', 'ші']
		exceptionWords.forEach(word => {
			expect(convertToRussish(word)).toBe('')
		})
	})

	it('should convert letters correctly', () => {
		const testCases: [string, string][] = [
			['и', 'ы'],
			['е', 'э'],
			['є', 'йе'],
			['г', 'х'],
			['щ', 'щ.'],
			['ї', 'йи'],
			['ґ', 'г'],
			['і', 'и'],
			['hello', 'hello'], // Test with a word that has no replacements
			['ігри', 'ихры'], // Test with a word that has multiple replacements
		]
		testCases.forEach(([input, expected]) => {
			expect(convertToRussish(input)).toBe(expected)
		})
	})
})
