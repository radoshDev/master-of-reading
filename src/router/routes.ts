import type { RouteRecordRaw } from 'vue-router'
import type { ROUTE_NAMES } from '@/constants'
import type { ValueOf } from '@/types'

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
	},
]
