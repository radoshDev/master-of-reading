import type { Chain } from '@/types/Pokemon'
import { getPokemonEvolves } from '../../helpers/getPokemonEvolves'
import { it, describe, expect } from 'vitest'

describe('getPokemonEvolves', () => {
	it('should return the correct result for a single evolution chain', () => {
		const chain: Chain = {
			evolution_details: [],
			evolves_to: [],
			is_baby: false,
			species: {
				name: 'Bulbasaur',
				url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
			},
		}
		const result = getPokemonEvolves(chain)
		expect(result).toEqual(['Bulbasaur'])
	})

	it('should return the correct result for a simple evolution chain', () => {
		const chain: Chain = {
			evolution_details: [],
			evolves_to: [
				{
					evolution_details: [],
					evolves_to: [],
					is_baby: false,
					species: {
						name: 'Ivysaur',
						url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
					},
				},
			],
			is_baby: false,
			species: {
				name: 'Bulbasaur',
				url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
			},
		}
		const result = getPokemonEvolves(chain)
		expect(result).toEqual(['Bulbasaur', 'Ivysaur'])
	})

	it('should return the correct result for a complex evolution chain', () => {
		const chain: Chain = {
			evolution_details: [],
			evolves_to: [
				{
					evolution_details: [],
					evolves_to: [
						{
							evolution_details: [],
							evolves_to: [],
							is_baby: false,
							species: {
								name: 'Charizard',
								url: 'https://pokeapi.co/api/v2/pokemon-species/6/',
							},
						},
					],
					is_baby: false,
					species: {
						name: 'Charmeleon',
						url: 'https://pokeapi.co/api/v2/pokemon-species/5/',
					},
				},
				{
					evolution_details: [],
					evolves_to: [],
					is_baby: false,
					species: {
						name: 'Wartortle',
						url: 'https://pokeapi.co/api/v2/pokemon-species/8/',
					},
				},
			],
			is_baby: false,
			species: {
				name: 'Squirtle',
				url: 'https://pokeapi.co/api/v2/pokemon-species/7/',
			},
		}
		const result = getPokemonEvolves(chain)
		expect(result).toEqual(['Squirtle', 'Charmeleon', 'Charizard', 'Wartortle'])
	})
})
