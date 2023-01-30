<script setup lang="ts">
import { computed } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis'

const pokemonStore = usePokemonStore()
const { speak, speaking } = useSpeechSynthesis()

const pokemon = computed(() => pokemonStore.pokemons[pokemonStore.index])
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
		<q-btn flat round icon="help" color="orange-13" />
		<div class="title">{{ pokemon.name }}</div>
	</div>
</template>

<style scoped lang="scss">
.salute {
	width: 100%;
	text-align: center;
	.salute-img {
		max-width: 100%;
		max-height: 40vh;
	}
	.title {
		font-size: 3rem;
		text-transform: capitalize;
	}
}
</style>
