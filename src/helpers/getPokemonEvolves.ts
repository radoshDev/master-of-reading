import type { Chain } from '@/types/Pokemon'

export const getPokemonEvolves = (chain: Chain): string[] => {
	const result = [chain.species.name]

	for (const evolution of chain.evolves_to) {
		result.push(evolution.species.name)
		const third = evolution.evolves_to.map(e => e.species.name)
		result.push(...third)
	}

	return result
}
