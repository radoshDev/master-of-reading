<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis'
import { ROUTE_NAMES } from '@/constants'

const pokemonStore = usePokemonStore()
const { speak, speaking } = useSpeechSynthesis()

const pokemon = computed(() => pokemonStore.pokemons.data[pokemonStore.index])
function handleSpeak() {
	if (speaking.value) return
	speak({ text: pokemon.value.name, rate: 0.7 })
}
</script>

<template>
	<div class="salute">
		<div @click="handleSpeak">
			<q-img
				:src="pokemon.dreamworld"
				:alt="pokemon.name"
				loading="eager"
				class="salute-img"
				fit="contain" />
		</div>
		<q-btn
			flat
			round
			icon="help"
			color="orange-13"
			:to="{ name: ROUTE_NAMES.pokemon, params: { id: pokemon.id } }" />
		<div class="title">{{ pokemon.name }}</div>
	</div>
</template>

<style scoped lang="scss">
.salute {
	padding-top: 0.5rem;
	width: 100%;
	text-align: center;
	.salute-img {
		max-width: 100%;
		max-height: 38vh;
	}
	.title {
		font-size: 3rem;
		line-height: 1;
		margin-bottom: 0.7rem;
		text-transform: capitalize;
	}
}
</style>
