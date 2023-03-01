import type { WordsList } from '@/types/Task'
import { it, describe, expect, vi } from 'vitest'
import { generateWords } from '@/services/generateWords'
import { getMixedWords } from '@/helpers/getMixedWords'

describe('generateWords', () => {
	const wordsList: WordsList = {
		three: [
			'bag',
			'dad',
			'gas',
			'jam',
			'lap',
			'map',
			'net',
			'pan',
			'ram',
			'sad',
			'tap',
			'van',
			'wet',
			'yak',
			'zap',
		],
		four: [
			'cake',
			'desk',
			'exit',
			'farm',
			'goal',
			'huge',
			'item',
			'jury',
			'king',
			'land',
			'menu',
			'next',
			'open',
			'park',
			'quiz',
			'rock',
			'star',
			'tube',
			'unit',
			'vast',
			'wild',
			'xray',
			'yawn',
			'zone',
		],
		five: [
			'apple',
			'beach',
			'cheek',
			'dance',
			'earth',
			'flame',
			'glide',
			'horse',
			'image',
			'jolly',
			'kiosk',
			'lemon',
			'mouse',
			'night',
			'olive',
			'plant',
			'quart',
			'river',
			'salty',
			'tulip',
			'uncle',
			'viola',
			'wagon',
			'young',
			'zebra',
		],
		difficult: [
			'awkward',
			'bagpipes',
			'crypt',
			'dwarves',
			'embezzle',
			'fishhook',
			'galaxy',
			'hyphen',
			'ivory',
			'jigsaw',
			'kazoo',
			'luxury',
			'memento',
			'nightclub',
			'onyx',
			'pajama',
			'quartz',
			'rhythm',
			'scratch',
			'twelfth',
			'unzip',
			'vortex',
			'wave',
			'xylophone',
			'yacht',
			'zigzag',
		],
	}

	const wordListSmall: WordsList = {
		three: ['cat', 'dog', 'pot', 'top'],
		four: ['bird', 'lion', 'fish'],
		five: ['apple', 'pear', 'grape'],
		difficult: ['xylophone', 'quicksand'],
	}

	it('returns an array of length 6 for type "mix"', () => {
		const result = generateWords(wordsList, 'mix')
		expect(result.length).toEqual(6)
	})

	it('returns an array of length 10 for type "three"', () => {
		const result = generateWords(wordsList, 'three')
		expect(result.length).toEqual(10)
	})

	it('returns an array of length 7 for type "four"', () => {
		const result = generateWords(wordsList, 'four')
		expect(result.length).toEqual(7)
	})

	it('returns an array of unique words', () => {
		const result = generateWords(wordsList, 'mix')
		const uniqueWords = new Set(result)
		expect(uniqueWords.size).toEqual(result.length)
	})

	it('returns an empty array when type is invalid', () => {
		const result = generateWords(wordsList, 'invalid' as any)
		expect(result).toEqual([])
	})

	it('returns all words if exercise length is greater than or equal to the number of words', () => {
		const result = generateWords(wordListSmall, 'four')
		expect(result.length).toEqual(wordListSmall['four'].length)
	})
	it('returns mixed words when type is mix', () => {
		vi.mock('@/helpers/getMixedWords', async () => {
			return {
				getMixedWords: vi.fn(() => [
					'cat',
					'dog',
					'rat',
					'frog',
					'duck',
					'seal',
				]),
			}
		})
		const wordsList = { ...wordListSmall, mix: [] }

		const words = generateWords(wordsList, 'mix')

		expect(getMixedWords).toHaveBeenCalledWith(wordsList)
		expect(words).toEqual(['cat', 'dog', 'rat', 'frog', 'duck', 'seal'])
	})
})
