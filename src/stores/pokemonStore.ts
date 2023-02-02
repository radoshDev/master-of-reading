import { defineStore } from 'pinia'
import { ref } from 'vue'
import { POKEMONS_STORAGE_KEY, POKEMONS_AMOUNT } from '@/constants'
import type { Pokemon } from '@/types/Pokemon'
import {
	getPokemons,
	getEvolutionChain,
	getPokemonSpecies,
} from '@/api/pokemonApi'
import { getRandomIndex } from '@/helpers/getRandomIndex'
import type { FetchData } from '@/types'
import { getPokemonEvolves } from '@/helpers/getPokemonEvolves'

export const usePokemonStore = defineStore('pokemon', () => {
	const pokemons = ref<FetchData<Pokemon[]>>({
		data: [],
		isLoading: false,
		error: '',
	})
	const pokemonEvolution = ref<string[]>([])
	const index = ref(0)

	async function fetchPokemons() {
		try {
			pokemons.value.isLoading = true
			pokemons.value.error = ''
			const savedPokemons = localStorage.getItem(POKEMONS_STORAGE_KEY)
			if (savedPokemons) {
				pokemons.value.data = JSON.parse(savedPokemons)
			} else {
				const response = await getPokemons()
				pokemons.value.data = response
				localStorage.setItem(POKEMONS_STORAGE_KEY, JSON.stringify(response))
			}
		} catch (error) {
			pokemons.value.error = 'Problem to load pokemons'
		} finally {
			pokemons.value.isLoading = false
		}
	}

	async function fetchEvolution(id: Pokemon['id']) {
		const species = await getPokemonSpecies(id)
		const result = await getEvolutionChain(species.evolution_chain.url)

		pokemonEvolution.value = getPokemonEvolves(result)
	}

	function setIndex() {
		const daysInWeek = 7
		const maxLength = POKEMONS_AMOUNT / daysInWeek
		const startIndex = new Date().getDay() * maxLength
		index.value = getRandomIndex(startIndex, maxLength)
	}

	return {
		index,
		pokemons,
		pokemonEvolution,
		fetchPokemons,
		fetchEvolution,
		setIndex,
	}
})
