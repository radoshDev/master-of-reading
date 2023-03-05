import { it, describe, expect, vi, beforeEach } from 'vitest'
import type { Mock, Mocked } from 'vitest'
import axios from 'axios'
import { getPokemons, getPokemonSpecies, getEvolutionChain } from './pokemonApi'
import type { Chain, Pokemon, Species } from '@/types/Pokemon'
import { POKEMONS_AMOUNT } from '@/constants'

vi.mock('axios')

const mockedAxios = axios as Mocked<typeof axios>

describe('pokemonApi', () => {
	describe('#getPokemons', () => {
		const mockResponse: Pokemon[] = [
			{
				name: 'bulbasaur',
				dreamworld:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
				id: 1,
			},
			{
				name: 'charmander',
				dreamworld:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
				id: 4,
			},
			{
				name: 'squirtle',
				dreamworld:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg',
				id: 7,
			},
		]

		beforeEach(() => {
			vi.resetAllMocks()
		})

		it('should return an array of Pokemon', async () => {
			// Arrange
			;(axios.post as Mock).mockResolvedValue({
				data: { data: { pokemons: { results: mockResponse } } },
			})

			// Act
			const result = await getPokemons()

			// Assert
			expect(result).toEqual(mockResponse)
		})

		it('should make a request to the correct URL with the correct query', async () => {
			// Arrange
			const expectedQuery = `query getPokemons {
			pokemons(limit: ${POKEMONS_AMOUNT}, offset: 0) {
				results{
					id
					name
					dreamworld
				}
			}
		}`
			const expectedUrl = 'https://graphql-pokeapi.graphcdn.app/'
			;(axios.post as Mock).mockResolvedValue({
				data: { data: { pokemons: { results: mockResponse } } },
			})
			// Act
			await getPokemons()

			// Assert
			expect(axios.post).toHaveBeenCalledWith(expectedUrl, {
				query: expectedQuery,
			})
		})

		it('should throw an error if the request fails', async () => {
			// Arrange
			const errorMessage = 'Request failed'
			const error = new Error(errorMessage)
			;(axios.post as Mock).mockRejectedValue(error)

			// Act and assert
			await expect(getPokemons()).rejects.toThrow(errorMessage)
		})
	})

	describe('#getPokemonSpecies', () => {
		const pokemonId = 25 // Pikachu

		it('should call axios.get with correct url', async () => {
			const expectedUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`
			const species: Species = {
				evolution_chain: {
					url: 'https://example.com/evolution-chain',
				},
				evolves_from_species: {
					name: 'pichu',
					url: 'https://example.com/pichu',
				},
			}
			mockedAxios.get.mockResolvedValueOnce({ data: species })
			await getPokemonSpecies(pokemonId)
			expect(mockedAxios.get).toHaveBeenCalledWith(expectedUrl)
		})

		it('should return Species object from axios response', async () => {
			const species: Species = {
				evolution_chain: {
					url: 'https://example.com/evolution-chain',
				},
				evolves_from_species: {
					name: 'pichu',
					url: 'https://example.com/pichu',
				},
			}
			mockedAxios.get.mockResolvedValueOnce({ data: species })
			const result = await getPokemonSpecies(pokemonId)
			expect(result).toEqual(species)
		})
	})

	describe('getEvolutionChain', () => {
		const url = 'https://pokeapi.co/api/v2/evolution-chain/1/'

		beforeEach(() => {
			vi.clearAllMocks()
		})

		it('returns the evolution chain given a valid URL', async () => {
			const expected: Chain = {
				evolution_details: [
					{
						min_level: 16,
						trigger: {
							name: 'level-up',
							url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
						},
						turn_upside_down: false,
						needs_overworld_rain: false,
						time_of_day: '1',
					},
				],
				evolves_to: [
					{
						evolution_details: [
							{
								min_level: 36,
								trigger: {
									name: 'level-up',
									url: 'https://pokeapi.co/api/v2/evolution-trigger/1/',
								},
								turn_upside_down: false,
								needs_overworld_rain: false,
								time_of_day: '1',
							},
						],
						evolves_to: [],
						is_baby: false,
						species: {
							name: 'blastoise',
							url: 'https://pokeapi.co/api/v2/pokemon-species/9/',
						},
					},
				],
				is_baby: false,
				species: {
					name: 'wartortle',
					url: 'https://pokeapi.co/api/v2/pokemon-species/8/',
				},
			}
			const mockedResult = { data: { chain: expected, id: 1 } }
			mockedAxios.get.mockResolvedValueOnce(mockedResult)

			const result = await getEvolutionChain(url)

			expect(result).toEqual(expected)
			expect(axios.get).toHaveBeenCalledTimes(1)
			expect(axios.get).toHaveBeenCalledWith(url)
		})

		it('throws an error if there is a problem with the request', async () => {
			const errorMessage = 'Something went wrong'
			mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage))

			await expect(getEvolutionChain(url)).rejects.toThrow(errorMessage)
			expect(axios.get).toHaveBeenCalledTimes(1)
			expect(axios.get).toHaveBeenCalledWith(url)
		})
	})
})
