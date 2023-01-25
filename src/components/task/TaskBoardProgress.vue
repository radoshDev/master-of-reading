<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import { computed } from 'vue'

const taskStore = useTaskStore()

const progress = computed(
	() => taskStore.exerciseScore.index / taskStore.exerciseScore.exercises.length
)
</script>

<template>
	<q-linear-progress
		size="30px"
		rounded
		:value="progress"
		:animation-speed="1000"
		class="q-mt-md">
		<div class="absolute-full flex flex-center">
			<q-badge
				class="badge"
				color="white"
				text-color="primary"
				:label="taskStore.exerciseScore.index" />
		</div>
	</q-linear-progress>
</template>

<style scoped lang="scss">
.badge {
	height: 80%;
	font-size: 1rem;
	line-height: 1;
	font-weight: 700;
}
</style>
