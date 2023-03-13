<script setup lang="ts">
import { getPokemonImage } from '@/helpers/getPokemonImage'
import type { Task } from '@/types/Task'

defineProps<{ task: Task }>()
</script>

<template>
	<q-card class="task-card">
		<q-card-section class="img-wrapper">
			<q-img
				:src="getPokemonImage(task.img.pokemonId)"
				:alt="task.img.name"
				height="100%"
				loading="eager"
				fit="contain"
				data-test="img" />
		</q-card-section>
		<q-card-section>
			<div class="title">{{ task.title }}</div>
		</q-card-section>
	</q-card>
</template>

<style lang="scss" scoped>
.task-card {
	width: 100%;
	height: 100px;
	display: flex;
	flex-direction: row;
	align-items: center;
	transition: all 0.3s ease;
	cursor: pointer;
	@media (min-width: 500px) {
		height: 100%;
		flex-direction: column;
		text-align: center;
	}
	.img-wrapper {
		width: 100px;
		height: 100%;
		@media (min-width: 500px) {
			flex: 1;
		}
	}
	.title {
		text-transform: capitalize;
		font-size: inherit;
		font-weight: bold;
	}
}
</style>
