import { defineStore } from 'pinia'
import { ref } from 'vue'
import { POKEMONS_STORAGE_KEY } from '@/constants'
import type { Pokemon } from '@/types/Pokemon'
import { getPokemons } from '@/api/pokemonApi'
import { getRandomIndex } from '@/utils/getRandomIndex'

export const usePokemonStore = defineStore('pokemon', () => {
	const pokemons = ref<Pokemon[]>([])
	const index = ref(0)

	async function setPokemons() {
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
		index.value = getRandomIndex(pokemons.value.length)
	}

	return { index, pokemons, setPokemons, setIndex }
})
