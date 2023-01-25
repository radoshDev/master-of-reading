import { consonants, vowels } from '@/constants'
import type { SyllableType } from '@/types/Task'
import { getRandomIndex } from '@/utils/getRandomIndex'

export class Syllable {
	syllablesList: string[] = []

	vowels = vowels

	consonants = consonants

	type: SyllableType

	constructor(type: SyllableType) {
		this.type = type
	}

	#generateSyllable(): string {
		const vowelIdx = getRandomIndex(this.vowels.length)
		const consonantIdx = getRandomIndex(this.consonants.length)
		const consonantSyllable =
			this.consonants[consonantIdx] + this.vowels[vowelIdx]
		const vowelSyllable = this.vowels[vowelIdx] + this.consonants[consonantIdx]

		if (this.type === 'consonantFirst') return consonantSyllable

		if (this.type === 'vowelFirst') return vowelSyllable

		if (Math.random() > 0.5) return consonantSyllable

		return vowelSyllable
	}

	getSyllable(): string {
		const syllable = this.#generateSyllable()
		const isDuplicate = this.syllablesList.includes(syllable)
		const exclusionReg = /.ї$|й[июяє]|[гчшщ][яює]/
		if (isDuplicate || exclusionReg.test(syllable)) {
			return this.getSyllable()
		}
		return syllable
	}

	generateSyllables(count: number): string[] {
		this.syllablesList = []
		for (let i = 0; i < count; i++) {
			this.syllablesList.push(this.getSyllable())
		}
		return this.syllablesList
	}
}
