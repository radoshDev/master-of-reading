import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import LayoutMain from '@/components/LayoutMain.vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import App from './App.vue'

// Mock usePokemonStore hook
vi.mock('@/stores/pokemonStore', () => ({
	usePokemonStore: vi.fn(() => ({
		fetchPokemons: vi.fn(),
	})),
}))

describe('App', () => {
	it.skip('fetches pokemons on mount', () => {
		const wrapper = mount(App, {
			global: {
				components: {
					LayoutMain,
				},
				plugins: [createTestingPinia({ createSpy: vi.fn })],
			},
		})
		// Ensure that usePokemonStore is called once
		// expect(usePokemonStore).toHaveBeenCalledTimes(1)

		const pokemonStore = usePokemonStore()
		// Ensure that fetchPokemons is called on mount
		expect(pokemonStore.fetchPokemons).toHaveBeenCalled()

		// Ensure that the LayoutMain component is rendered
		const layoutMain = wrapper.findComponent(LayoutMain)
		expect(layoutMain.exists()).toBe(true)
	})
})
