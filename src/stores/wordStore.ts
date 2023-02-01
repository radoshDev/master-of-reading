import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WordsList, WordHeader } from '@/types/Task'
import { getWords } from '@/api/wordsApi'
import { csvParser } from '@/utils/csvParser'

export const useWordStore = defineStore('word', () => {
	const words = ref<WordsList | null>(null)

	async function fetchWords() {
		const wordsCsv = await getWords()
		const wordsList = csvParser<WordHeader>(wordsCsv)
		words.value = wordsList
	}

	return { fetchWords, words }
})
