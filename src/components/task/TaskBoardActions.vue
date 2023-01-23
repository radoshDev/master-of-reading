<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import type { TaskType } from '@/types/Task'
import { computed } from 'vue'

const props = defineProps<{ taskType: TaskType }>()
const taskStore = useTaskStore()

const exercise = computed(() => {
	const selectedExercise = taskStore.selectedExercise[props.taskType]
	return taskStore.tasksScore[props.taskType][selectedExercise]
})

function handlePrev() {
	exercise.value.index -= 1
}
function handleNext() {
	exercise.value.index += 1
}
</script>

<template>
	<div class="task-board-actions">
		<q-btn
			@click="handlePrev"
			icon="arrow_back_ios"
			label="Назад"
			size="1.2rem"
			:disable="exercise.index === 0" />
		<q-btn
			v-if="exercise.index === exercise.exercises.length"
			label="Ще"
			icon-right="add"
			size="1.2rem"
			text-color="black"
			color="green-13" />
		<q-btn
			v-else
			@click="handleNext"
			icon-right="arrow_forward_ios"
			label="Вперед"
			color="blue-5"
			text-color="black"
			size="1.2rem" />
	</div>
</template>

<style lang="scss">
.task-board-actions {
	display: flex;
	gap: 25px;
	justify-content: center;
	align-items: center;
	.q-btn {
		.block {
			line-height: 1;
			font-weight: 700;
		}
	}
}
</style>
