import { it, describe, expect } from 'vitest'
import { getPokemonImage } from './getPokemonImage'

describe('getPokemonImage', () => {
	it('should return the correct URL for Pikachu', () => {
		expect(getPokemonImage(25)).toEqual(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
		)
	})

	it('should return the correct URL for Charizard', () => {
		expect(getPokemonImage(6)).toEqual(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg'
		)
	})

	it('should return the correct URL for Bulbasaur', () => {
		expect(getPokemonImage(1)).toEqual(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
		)
	})
})
