export const csvParser = <T extends string = string>(
	strData: string
): Record<T, string[]> => {
	const list = strData.split(/\r?\n/)

	const headerList = list[0].split(',')

	const result = list.slice(1).reduce((acc, curr) => {
		const valueList = curr.split(',')
		for (let i = 0; i < headerList.length; i++) {
			const header = headerList[i]?.trim()
			const value = valueList[i]?.trim()
			if (value) {
				acc[header] = [...(acc[header] || []), value]
			}
		}
		return acc
	}, {} as Record<string, string[]>)

	return result
}
