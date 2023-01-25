<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import { computed } from 'vue'

const pokemonStore = usePokemonStore()

const pokemon = computed(() => pokemonStore.pokemons[pokemonStore.index])
</script>

<template>
	<div class="salute">
		<q-img
			:src="pokemon.dreamworld"
			:alt="pokemon.name"
			class="salute-img"
			fit="contain" />
		<div class="title">{{ pokemon.name }}</div>
	</div>
</template>

<style scoped lang="scss">
.salute {
	width: 100%;
	.salute-img {
		max-height: 50vh;
	}
	.title {
		font-size: 4rem;
		text-transform: capitalize;
		text-align: center;
	}
}
</style>
