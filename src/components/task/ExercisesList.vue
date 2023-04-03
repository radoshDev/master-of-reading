<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import type { MainTask } from '@/types/Task'
import TaskCard from './TaskCard.vue'

defineProps<{
	subTasks: MainTask['subtasks']
}>()
const taskStore = useTaskStore()
</script>

<template>
	<div class="exercises-list">
		<div
			class="subtask-item"
			v-for="(task, subtype) in subTasks"
			:key="subtype"
			@click="taskStore.setExerciseType(subtype)">
			<TaskCard
				:task="task"
				:class="{
					['bg-light-green-11']: taskStore.exerciseType === subtype,
				}" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.exercises-list {
	min-height: 0;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 30px;
	@media (min-width: 500px) {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.subtask-item {
		width: 100%;
		font-size: 1.5rem;
		@media (min-width: 500px) {
			max-width: 200px;
			height: 250px;
		}
	}
}
</style>
