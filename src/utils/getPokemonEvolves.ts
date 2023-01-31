import type { Chain } from '@/types/Pokemon'

export const getPokemonEvolves = (chain: Chain): string[] => {
	const first = chain.species.name
	const second = chain.evolves_to[0]?.species.name
	const third = chain.evolves_to[0]?.evolves_to[0]?.species.name
	return [first, second, third]
}
