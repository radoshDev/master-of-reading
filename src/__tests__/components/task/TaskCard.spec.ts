import TaskCard from '@/components/task/TaskCard.vue'
import { mount } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'

describe('TaskCard', () => {
	const task = {
		title: 'Test Task',
		img: {
			src: 'test.png',
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
		expect(img.attributes('src')).toMatch(task.img.src)
		expect(img.attributes('alt')).toMatch(task.img.name)
	})
})
