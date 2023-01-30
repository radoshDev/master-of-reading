import axios from 'axios'
const wordsUrl =
	'https://gist.githubusercontent.com/radoshDev/d3af3a2be5403786f67dcdc72a39e38e/raw/d6749c181e546e6293510db06262ca8db4660390/ukrainian-words.csv'

export const getWords = async (): Promise<string> => {
	const result = await axios.get<string>(wordsUrl)
	return result.data
}
