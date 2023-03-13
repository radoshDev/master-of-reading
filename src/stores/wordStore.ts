import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getWords } from '@/api/wordsApi'
import { csvParser } from '@/helpers/csvParser'

export type WordHeader = 'three' | 'four' | 'five' | 'difficult'

export type WordsList = Record<WordHeader, string[]>

export const useWordStore = defineStore('word', () => {
	const words = ref<WordsList | null>(null)

	async function fetchWords() {
		const wordsCsv = await getWords()
		const wordsList = csvParser<WordHeader>(wordsCsv)
		words.value = wordsList
	}

	return { fetchWords, words }
})
