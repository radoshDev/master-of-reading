import type { TasksScore, TaskType } from '@/types/Task'
import { TASKS } from '@/constants'

export const getStartTasksScore = (): TasksScore => {
	const startTasksScore = {} as TasksScore
	for (const task in TASKS) {
		startTasksScore[task as TaskType] = {}
		for (const subtask in TASKS[task as TaskType].subtasks) {
			// @ts-ignore
			startTasksScore[task as TaskType][subtask] = {}
		}
	}

	return startTasksScore
}
