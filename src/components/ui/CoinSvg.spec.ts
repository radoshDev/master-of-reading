import CoinSvg from '@/components/ui/CoinSvg.vue'
import { shallowMount } from '@vue/test-utils'
import { it, describe, expect } from 'vitest'

describe('CoinSvg.vue', () => {
	it('renders svg element with count', () => {
		const wrapper = shallowMount(CoinSvg, {
			props: {
				count: 5,
			},
		})

		expect(wrapper.find('svg').exists()).toBe(true)
		expect(wrapper.find('svg').attributes('viewBox')).toBe('0 0 512 512')
		expect(wrapper.find('svg').attributes('fill')).toBe('transparent')
		expect(wrapper.findAll('path')).toHaveLength(8)
	})

	it('renders correct number of coins', () => {
		const wrapper = shallowMount(CoinSvg, {
			props: {
				count: 3,
			},
		})

		expect(wrapper.find('text').text()).toBe('3')
	})
})
