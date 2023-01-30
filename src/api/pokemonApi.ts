import { POKEMONS_AMOUNT } from '@/constants'
import type { Pokemon, Chain, EvolutionChainResponse } from '@/types/Pokemon'
import axios from 'axios'

type PokemonsResponse = {
	data: {
		pokemons: {
			results: Pokemon[]
		}
	}
}

const url = 'https://graphql-pokeapi.graphcdn.app/'

export const getPokemons = async (): Promise<Pokemon[]> => {
	const result = await axios.post<PokemonsResponse>(url, {
		query: `query getPokemons {
			pokemons(limit: ${POKEMONS_AMOUNT}, offset: 0) {
				results{
					id
					name
					dreamworld
				}
			}
		}`,
	})
	return result.data.data.pokemons.results
}

export const getEvolutionChain = async (id: Pokemon['id']): Promise<Chain> => {
	const result = await axios.post<EvolutionChainResponse>(url, {
		query: `query {
			evolutionChain(id: ${id}){
				response
			}
		}`,
	})
	return result.data.data.evolutionChain.response.chain
}
