export const calculateFontSize = (wordLength: number): string => {
	const desktopSize = 1200 / wordLength
	if (wordLength < 3) {
		return '50vw'
	}
	if (wordLength === 3) {
		return `min(${desktopSize}px, 39vw)`
	}
	if (wordLength === 4) {
		return `min(${desktopSize}px, 30vw)`
	}
	if (wordLength === 5) {
		return `min(${desktopSize}px, 22vw)`
	}
	if (wordLength === 6) {
		return `min(${desktopSize}px, 19vw)`
	}
	if (wordLength === 7) {
		return `min(${desktopSize}px, 16vw)`
	}
	if (wordLength === 8) {
		return `min(${desktopSize}px, 14vw)`
	}
	return '1rem'
}
