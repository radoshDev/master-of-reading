import { it, describe, expect, vi } from 'vitest'
import type { Mocked } from 'vitest'
import axios from 'axios'
import { getWords } from './wordsApi'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('wordsApi', () => {
	describe('getWords', () => {
		const wordsUrl = '/db/words.csv'
		it('should make a request and return a string of words', async () => {
			const expectedWords = 'lorem ipsum dolor sit amet'
			mockedAxios.get.mockResolvedValueOnce({ data: expectedWords })

			const words = await getWords()

			expect(mockedAxios.get).toHaveBeenCalledTimes(1)
			expect(mockedAxios.get).toHaveBeenCalledWith(wordsUrl)
			expect(words).toEqual(expectedWords)
		})
	})
})
