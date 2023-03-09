import { csvParser } from '@/helpers/csvParser'
import { it, describe, expect } from 'vitest'

describe('#csvParser', () => {
	it('should parse CSV string into object', () => {
		const csvString = `Name, Age, City
                        John, 28, New York
                        Alice, 24, Los Angeles
                        Bob, 30, San Francisco`

		const expected = {
			Name: ['John', 'Alice', 'Bob'],
			Age: ['28', '24', '30'],
			City: ['New York', 'Los Angeles', 'San Francisco'],
		}

		expect(csvParser(csvString)).toEqual(expected)
	})

	it('should handle empty values', () => {
		const csvString = `Name, Age, City
                        John, 28, New York
                        , 24, Los Angeles
                        Bob, , San Francisco`

		const expected = {
			Name: ['John', 'Bob'],
			Age: ['28', '24'],
			City: ['New York', 'Los Angeles', 'San Francisco'],
		}

		expect(csvParser(csvString)).toEqual(expected)
	})

	it('should handle extra spaces and newlines', () => {
		const csvString = `Name,Age,City\n\n
                        John,   28, New York\n
                        Alice,24,Los Angeles\n
                        Bob, 30,San Francisco\n\n`

		const expected = {
			Name: ['John', 'Alice', 'Bob'],
			Age: ['28', '24', '30'],
			City: ['New York', 'Los Angeles', 'San Francisco'],
		}

		expect(csvParser(csvString)).toEqual(expected)
	})
})
