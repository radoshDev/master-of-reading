import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import LayoutMain from '@/components/LayoutMain.vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import App from './App.vue'

describe('App', () => {
	const wrapper = mount(App, {
		global: {
			components: {
				LayoutMain,
			},
			plugins: [createTestingPinia({ createSpy: vi.fn })],
		},
	})

	it('renders a LayoutMain component', () => {
		const layoutMain = wrapper.findComponent(LayoutMain)
		expect(layoutMain.exists()).toBe(true)
	})
	it('calls fetchPokemons on mount one time', () => {
		const pokemonStore = usePokemonStore()
		expect(pokemonStore.fetchPokemons).toHaveBeenCalledTimes(1)
	})
})
