<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import TaskCard from '../task/TaskCard.vue'
import { ROUTE_NAMES } from '@/constants'

const pokemonStore = usePokemonStore()
const page = ref(1)
const perPage = 12
const pagesAmount = computed(() =>
	Math.ceil(pokemonStore.pokemons.data.length / perPage)
)
const pokemonsList = computed(() => {
	return pokemonStore.pokemons.data.slice(0, page.value * perPage)
})
</script>

<template>
	<div class="list-wrapper">
		<div class="list">
			<RouterLink
				class="link"
				v-for="pokemon in pokemonsList"
				:to="{ name: ROUTE_NAMES.pokemon, params: { id: pokemon.id } }"
				:key="pokemon.id">
				<TaskCard
					:task="{
						title: pokemon.name,
						img: { name: pokemon.name, pokemonId: pokemon.id },
					}" />
			</RouterLink>
		</div>
		<q-btn
			v-if="pagesAmount !== page"
			@click="page += 1"
			label="Ще"
			color="primary"
			align="center" />
	</div>
</template>

<style scoped lang="scss">
.list-wrapper {
	min-height: 0;
	flex: 1;
	overflow: auto;
	text-align: center;

	.list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.5rem;
		@media (min-width: 500px) {
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
		}
		.link {
			@media (min-width: 500px) {
				width: 250px;
			}
		}
	}
}
</style>
