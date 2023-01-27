<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import { ref } from 'vue'
import TaskCard from '../task/TaskCard.vue'

const pokemonStore = usePokemonStore()
</script>

<template>
	<div class="list">
		<TaskCard
			class="q-mb-md"
			v-for="pokemon in pokemonStore.pokemons"
			:task="{
				title: pokemon.name,
				img: { name: pokemon.name, src: pokemon.dreamworld },
			}"
			:key="pokemon.name" />
	</div>
</template>

<style scoped lang="scss"></style>
