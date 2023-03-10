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
	const mockWordsCsv = 'three,four,five,difficult\nfoo,bar,baz,qux\n'
	const mockWordsList: WordsList = {
		three: ['foo'],
		four: ['bar'],
		five: ['baz'],
		difficult: ['qux'],
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

		expect(wordStore.words.data).toBeNull()
		await wordStore.fetchWords()
		expect(getWords).toHaveBeenCalledTimes(1)
		expect(csvParser).toHaveBeenCalledTimes(1)
		expect(csvParser).toHaveBeenCalledWith(mockWordsCsv)
		expect(wordStore.words.isLoading).toBe(false)
		expect(wordStore.words.data).toEqual(mockWordsList)
		expect(wordStore.words.error).toBe('')
	})

	it('should set error message when fetching words fails', async () => {
		// Arrange
		const mockError = new Error('Error fetching words')

		;(getWords as MockedFunction<typeof getWords>).mockRejectedValueOnce(
			mockError
		)

		// Act
		const wordStore = useWordStore()
		await wordStore.fetchWords()

		// Assert
		expect(getWords).toHaveBeenCalledTimes(1)
		expect(csvParser).not.toHaveBeenCalled()
		expect(wordStore.words.isLoading).toBe(false)
		expect(wordStore.words.data).toBe(null)
		expect(wordStore.words.error).toBe('Problem to load words...')
	})

	it('should set isLoading to true while fetching words data and set it to false when done', async () => {
		// Arrange
		;(getWords as MockedFunction<typeof getWords>).mockResolvedValue(
			mockWordsCsv
		)
		;(csvParser as MockedFunction<typeof csvParser>).mockReturnValue(
			mockWordsList
		)

		// Act
		const wordStore = useWordStore()
		const promise = wordStore.fetchWords()

		// Assert
		expect(wordStore.words.isLoading).toBe(true)
		await promise
		expect(getWords).toHaveBeenCalledTimes(1)
		expect(csvParser).toHaveBeenCalledTimes(1)
		expect(csvParser).toHaveBeenCalledWith(mockWordsCsv)
		expect(wordStore.words.isLoading).toBe(false)
		expect(wordStore.words.data).toEqual(mockWordsList)
		expect(wordStore.words.error).toBe('')
	})
})
