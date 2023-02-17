import type { Chain } from '@/types/Pokemon'

export const getPokemonEvolves = (chain: Chain): string[] => {
	const result = [chain.species.name]

	const second = chain.evolves_to[0]?.species.name
	if (second) result.push(second)
	const third = chain.evolves_to[0]?.evolves_to[0]?.species.name
	if (third) result.push(third)

	return result
}
