import { mount } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'
import TaskCard from '@/components/task/TaskCard.vue'
import type { Task } from '@/types/Task'

describe('TaskCard', () => {
	const task: Task = {
		title: 'Test Task',
		img: {
			pokemonId: 1,
			name: 'Test Image',
		},
	}

	it('renders task title', () => {
		const wrapper = mount(TaskCard, {
			props: { task },
		})

		expect(wrapper.find('.title').text()).toMatch(task.title)
	})

	it('renders task image', () => {
		const wrapper = mount(TaskCard, {
			props: { task },
		})

		const img = wrapper.get('[data-test="img"]')
		expect(img.attributes('src')).toMatch(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'
		)
		expect(img.attributes('alt')).toMatch(task.img.name)
	})
})
