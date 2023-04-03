import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vi } from 'vitest'
import type { MockedFunction } from 'vitest'
import { getWords } from '@/api/wordsApi'
import { csvParser } from '@/helpers/csvParser'
import type { WordsList } from '@/types/Task'
import { useWordStore } from './wordStore'

vi.mock('@/api/wordsApi', () => {
	return {
		getWords: vi.fn(),
	}
})

vi.mock('@/helpers/csvParser', () => {
	return {
		csvParser: vi.fn(),
	}
})

describe('#wordStore', async () => {
	const mockWordsCsv = 'three,four,five,six\nfoo,bar,baz,qux\n'
	const mockWordsList: WordsList = {
		three: [],
		four: [],
		five: [],
		six: [],
	}

	beforeEach(() => {
		setActivePinia(createPinia())
		vi.clearAllMocks()
	})

	it('fetches words and sets to the store', async () => {
		;(getWords as MockedFunction<typeof getWords>).mockResolvedValue(
			mockWordsCsv
		)
		;(csvParser as MockedFunction<typeof csvParser>).mockReturnValue(
			mockWordsList
		)
		const wordStore = useWordStore()

		expect(wordStore.words).toBeNull()
		await wordStore.fetchWords()
		expect(getWords).toHaveBeenCalledTimes(1)
		expect(csvParser).toHaveBeenCalledTimes(1)
		expect(csvParser).toHaveBeenCalledWith(mockWordsCsv)
		expect(wordStore.words).toEqual(mockWordsList)
	})
})
