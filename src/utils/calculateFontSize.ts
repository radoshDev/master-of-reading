export const calculateFontSize = (wordLength: number): string => {
	if (wordLength < 3) {
		return '50vw'
	}
	if (wordLength === 3) {
		return '39vw'
	}
	if (wordLength === 4) {
		return '30vw'
	}
	if (wordLength === 5) {
		return '22vw'
	}
	if (wordLength === 6) {
		return '19vw'
	}
	if (wordLength === 7) {
		return '19vw'
	}
	if (wordLength === 8) {
		return '14vw'
	}
	return '1rem'
}
