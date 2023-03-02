import { getRandomIndex } from './getRandomIndex'

export const generateUniqueList = <T>(list: T[], length: number): T[] => {
	if (list.length <= length) return list

	if (new Set(list).size < length) return list.slice(0, length)

	const result: Set<T> = new Set()

	while (result.size !== length) {
		const randomIndex = getRandomIndex(list.length)
		const item = list[randomIndex]

		if (result.has(item)) continue

		result.add(item)
	}

	return Array.from(result)
}
