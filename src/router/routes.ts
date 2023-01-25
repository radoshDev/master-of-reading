import type { RouteRecordRaw } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import type { ROUTE_NAMES } from '@/constants'
import type { ValueOf } from '@/types'
import type { TaskType } from '@/types/Task'

export type RouteRecord = Omit<RouteRecordRaw, 'name'> & {
	name: ValueOf<typeof ROUTE_NAMES>
}

export const routes: RouteRecord[] = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
	},
	{
		path: '/about',
		name: 'about',
		component: () => import('@/views/AboutView.vue'),
	},
	{
		path: '/task/:type',
		name: 'task',
		component: () => import('@/views/TaskView.vue'),
		beforeEnter: (to, from, next) => {
			const taskStore = useTaskStore()
			const taskType = to.params['type']
			if (typeof taskType === 'string') {
				taskStore.taskType = taskType as TaskType
				return next()
			}
			return next({ name: 'home' })
		},
	},
]
