import { defineStore } from 'pinia'
import { ref } from 'vue'
import { POKEMONS_STORAGE_KEY, POKEMONS_AMOUNT } from '@/constants'
import type { Pokemon } from '@/types/Pokemon'
import { getPokemons } from '@/api/pokemonApi'
import { getRandomIndex } from '@/utils/getRandomIndex'

export const usePokemonStore = defineStore('pokemon', () => {
	const pokemons = ref<Pokemon[]>([])
	const index = ref(0)

	async function fetchPokemons() {
		const savedPokemons = localStorage.getItem(POKEMONS_STORAGE_KEY)
		if (savedPokemons) {
			pokemons.value = JSON.parse(savedPokemons)
		} else {
			const response = await getPokemons()
			pokemons.value = response
			localStorage.setItem(POKEMONS_STORAGE_KEY, JSON.stringify(response))
		}
	}

	function setIndex() {
		const daysInWeek = 7
		const maxLength = POKEMONS_AMOUNT / daysInWeek
		const startIndex = new Date().getDay() * maxLength
		index.value = getRandomIndex(startIndex, maxLength)
	}

	return { index, pokemons, fetchPokemons, setIndex }
})
