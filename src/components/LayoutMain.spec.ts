import { shallowMount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import LayoutMain from '@/components/LayoutMain.vue'

describe('LayoutMain', () => {
	it('renders slot content', () => {
		const wrapper = shallowMount(LayoutMain, {
			slots: {
				default: 'Test content',
			},
		})

		expect(wrapper.text()).toBe('Test content')
	})
})
