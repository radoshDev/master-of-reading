<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import type { MainTask, TaskType } from '@/types/Task'
import TaskCard from './TaskCard.vue'

const props = defineProps<{
	subTasks: MainTask['subtasks']
	taskType: TaskType
}>()

const selectedExercise = computed(
	() => taskStore.selectedExercise[props.taskType]
)

const taskStore = useTaskStore()
</script>

<template>
	<div class="subtasks">
		<div
			class="subtask-item"
			v-for="(task, subtype) in subTasks"
			:key="subtype"
			@click="taskStore.setExerciseType(taskType, subtype)">
			<TaskCard
				:task="task"
				:class="{ ['bg-light-green-11']: selectedExercise === subtype }" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.subtasks {
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin-bottom: 50px;
	@media (min-width: 500px) {
		flex-direction: row;
		justify-content: center;
	}
	.subtask-item {
		width: 100%;
		font-size: 1.5rem;
		@media (min-width: 500px) {
			max-width: 200px;
		}
	}
}
</style>
