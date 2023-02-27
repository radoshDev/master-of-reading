import { getRandomIndex } from '@/helpers/getRandomIndex'
import { it, describe, expect } from 'vitest'

describe('getRandomIndex', () => {
	it('returns a random number between 0 and length-1 if start is not provided', () => {
		const length = 10
		const index = getRandomIndex(length)
		expect(index).toBeGreaterThanOrEqual(0)
		expect(index).toBeLessThan(length)
	})

	it('returns a random number between start and length-1 if start is provided', () => {
		const length = 10
		const start = 2
		const index = getRandomIndex(length, start)
		expect(index).toBeGreaterThanOrEqual(start)
		expect(index).toBeLessThan(length + start)
	})
})
