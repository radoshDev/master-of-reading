export type ValueOf<T extends Object> = T[keyof T]

export type FetchData<T> = {
	data: T
	isLoading: boolean
	error: string
}
