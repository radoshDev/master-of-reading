import { consonants, vowels } from '@/constants'
import { Syllable } from '@/services/Syllable'
import { it, describe, expect } from 'vitest'

describe('Syllable', () => {
	describe('getSyllable()', () => {
		it('should generate a syllable without duplicates', () => {
			const syllable = new Syllable('mix')
			const generatedSyllables: string[] = []
			for (let i = 0; i < 10; i++) {
				const syl = syllable.getSyllable()
				expect(generatedSyllables).not.toContain(syl)
				generatedSyllables.push(syl)
			}
		})

		it('should generate a syllable starting with a vowel', () => {
			const syllable = new Syllable('vowelFirst')
			for (let i = 0; i < 10; i++) {
				const syl = syllable.getSyllable()
				expect(vowels).toContain(syl.charAt(0))
			}
		})

		it('should generate a syllable starting with a consonant', () => {
			const syllable = new Syllable('consonantFirst')
			for (let i = 0; i < 10; i++) {
				const syl = syllable.getSyllable()
				expect(consonants).toContain(syl.charAt(0))
			}
		})

		it('should not generate certain prohibited syllables', () => {
			const syllable = new Syllable('mix')
			for (let i = 0; i < 10; i++) {
				const syl = syllable.getSyllable()
				const exclusionReg = /.ї$|й[июяє]|[гжчшщз]є|[гжчшщ]ю/
				expect(exclusionReg.test(syl)).toBe(false)
			}
		})
	})

	describe('generateSyllables()', () => {
		it('should generate the specified number of syllables', () => {
			const syllable = new Syllable('mix')
			const syllables = syllable.generateSyllables(5)
			expect(syllables.length).toBe(5)
		})
	})
})
