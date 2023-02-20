import axios from 'axios'
const wordsUrl = '/db/words.csv'

export const getWords = async (): Promise<string> => {
	const result = await axios.get<string>(wordsUrl)
	return result.data
}
