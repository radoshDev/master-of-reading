import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getWords } from '@/api/wordsApi'
import { csvParser } from '@/helpers/csvParser'
import type { FetchData } from '@/types'

export type WordHeader = 'three' | 'four' | 'five' | 'difficult'

export type WordsList = Record<WordHeader, string[]>

export const useWordStore = defineStore('word', () => {
	const words = reactive<FetchData<WordsList | null>>({
		data: null,
		isLoading: false,
		error: '',
	})

	async function fetchWords() {
		try {
			words.isLoading = true
			const wordsCsv = await getWords()
			const wordsList = csvParser<WordHeader>(wordsCsv)
			words.data = wordsList
			words.error = ''
		} catch (error) {
			words.error = 'Problem to load words...'
		} finally {
			words.isLoading = false
		}
	}

	return { fetchWords, words }
})
