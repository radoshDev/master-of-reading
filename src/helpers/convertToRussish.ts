export const convertToRussish = (text: string): string => {
	const replaceList: Record<string, string> = {
		и: 'ы',
		е: 'э',
		є: 'йе',
		г: 'х',
		щ: 'щ.',
		ї: 'йи',
		ґ: 'г',
		і: 'и',
	}
	const exceptions = ['ця', 'до', 'со', 'ко', 'го', 'щи', 'фи', 'ші']
	if (exceptions.includes(text)) return ''

	const letters = text.split('').map(chapter => replaceList[chapter] || chapter)
	return letters.join('')
}
