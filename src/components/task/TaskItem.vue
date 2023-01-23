<script setup lang="ts">
import { computed } from 'vue'
import NoTask from '@/components/task/NoTask.vue'
import ExercisesList from '@/components/task/ExercisesList.vue'
import TaskBoard from '@/components/task/TaskBoard.vue'
import { ROUTE_NAMES } from '@/constants'
import { useTaskStore } from '@/stores/taskStore'
import { tasks } from '@/stores/taskStore'
import type { TaskType } from '@/types/Task'
import { useRoute } from 'vue-router'

const taskStore = useTaskStore()
const route = useRoute()
let taskType = (
	typeof route.params['type'] === 'string' ? route.params['type'] : ''
) as TaskType

const exercise = tasks[taskType]

const showContinueBtn = computed(() => {
	const exerciseType = taskStore.selectedExercise[taskType]
	return taskStore.tasksScore[taskType][exerciseType]?.exercises.length > 0
})

function handleStartTask() {
	taskStore.showTask = true
}
</script>

<template>
	<div class="task" v-if="exercise">
		<div class="header">
			<q-btn
				icon="arrow_back_ios_new"
				flat
				size="1.2rem"
				:to="{ name: ROUTE_NAMES.home }" />
			<h2 class="title">{{ exercise.title }}</h2>
		</div>
		<ExercisesList :sub-tasks="exercise.subtasks" :task-type="taskType" />
		<div class="actions">
			<q-btn
				label="Продовжити"
				color="yellow-9"
				class="btn"
				size="1.2rem"
				v-if="showContinueBtn" />
			<q-btn
				label="Початок"
				color="blue-8"
				class="btn"
				size="1.2rem"
				@click="handleStartTask" />
		</div>
		<TaskBoard :task-type="taskType" />
	</div>
	<NoTask v-else />
</template>

<style scoped lang="scss">
.task {
	text-align: center;
	padding: 1.5rem 0;
	.header {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin: 0 0 2rem;
		.title {
			font-size: 3rem;
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
