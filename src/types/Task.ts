import type { TASK_TYPE } from '@/constants'

export type TaskType = keyof typeof TASK_TYPE

export type Task = {
	title: string
	img: {
		src: string
		name: string
	}
}
