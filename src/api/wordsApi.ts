import axios from 'axios'
const wordsUrl =
	'https://gist.githubusercontent.com/radoshDev/d3af3a2be5403786f67dcdc72a39e38e/raw/37ee77e4e4f64cf6a6cc18842a0589c5b334751f/ukrainian-words.csv'

export const getWords = async (): Promise<string> => {
	const result = await axios.get<string>(wordsUrl)
	return result.data
}
