import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import type { RouteRecordRaw } from 'vue-router'
import { it, describe, expect } from 'vitest'

describe('router', () => {
	const router = createRouter({
		history: createWebHistory(import.meta.env.BASE_URL),
		routes: routes as RouteRecordRaw[],
	})

	it('should have a not found route', () => {
		const notFoundRoute = router
			.getRoutes()
			.find(route => route.name === 'not-found')
		expect(notFoundRoute).toBeDefined()
	})

	it('should have a home route', () => {
		const homeRoute = router.getRoutes().find(route => route.name === 'home')
		expect(homeRoute).toBeDefined()
	})

	it('should have a about route', () => {
		const aboutRoute = router.getRoutes().find(route => route.name === 'about')
		expect(aboutRoute).toBeDefined()
	})

	it('should have a contact route', () => {
		const contactRoute = router.getRoutes().find(route => route.name === 'task')
		expect(contactRoute).toBeDefined()
	})
})
