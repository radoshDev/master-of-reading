import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WordsList, WordHeader } from '@/types/Task'
import { getWords } from '@/api/wordsApi'
import { csvParser } from '@/utils/csvParser'

export const useWordStore = defineStore('word', () => {
	const words = ref({
		data: null as WordsList | null,
		isLoading: false,
		error: '',
	})

	async function fetchWords() {
		try {
			words.value.isLoading = true
			words.value.error = ''
			const wordsCsv = await getWords()
			const wordsList = csvParser<WordHeader>(wordsCsv)
			words.value.data = wordsList
		} catch (error) {
			words.value.error = 'Problem to load words'
		} finally {
			words.value.isLoading = false
		}
	}

	return { fetchWords, words }
})
