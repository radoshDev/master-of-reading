<script setup lang="ts">
import { computed } from 'vue'
import ExercisesList from '@/components/task/ExercisesList.vue'
import TaskBoard from '@/components/task/TaskBoard.vue'
import { ROUTE_NAMES } from '@/constants'
import { useTaskStore } from '@/stores/taskStore'
import { tasks } from '@/stores/taskStore'
import { usePokemonStore } from '@/stores/pokemonStore'

const taskStore = useTaskStore()
const pokemonStore = usePokemonStore()

const exercise = computed(() => tasks[taskStore.taskType])

const showContinueBtn = computed(
	() => taskStore.exerciseScore?.exercises.length > 0
)

function handleStartTask() {
	pokemonStore.setIndex()
	taskStore.startTask()
}

function handleContinueTask() {
	taskStore.showTask = true
}
</script>

<template>
	<div class="task">
		<div class="header">
			<q-btn
				icon="arrow_back_ios_new"
				flat
				size="1.05rem"
				:to="{ name: ROUTE_NAMES.home }" />
			<h2 class="title">{{ exercise.title }}</h2>
		</div>
		<ExercisesList :sub-tasks="exercise.subtasks" />
		<div class="actions">
			<q-btn
				v-if="taskStore.exerciseScore"
				@click="handleStartTask"
				label="Початок"
				color="blue-8"
				class="btn"
				size="1.05rem" />
			<q-btn
				@click="handleContinueTask"
				label="Продовжити"
				color="yellow-9"
				class="btn"
				size="1.05rem"
				v-if="showContinueBtn" />
		</div>
		<TaskBoard />
	</div>
</template>

<style scoped lang="scss">
.task {
	.header {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin: 0 0 2rem;
		.title {
			font-size: 2.5rem;
			font-weight: bold;
			margin: 0;
		}
	}
	.actions {
		display: flex;
		justify-content: center;
		gap: 25px;
		flex-wrap: wrap;
		.btn {
			min-width: 150px;
		}
	}
}
</style>
