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
			const taskTypes = Object.keys(taskStore.selectedExercise)

			if (typeof taskType === 'string' && taskTypes.indexOf(taskType) !== -1) {
				taskStore.taskType = taskType as TaskType
				return next()
			}
			return next({ name: 'home' })
		},
	},
	{
		path: '/pokemons',
		name: 'pokemons',
		component: () => import('@/views/PokemonsView.vue'),
	},
	{
		path: '/pokemons/:id',
		name: 'pokemon',
		component: () => import('@/views/PokemonView.vue'),
	},
	{
		path: '/404',
		name: 'not-found',
		component: () => import('@/views/NotFoundView.vue'),
	},
]
