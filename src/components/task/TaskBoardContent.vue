<script setup lang="ts">
import { computed } from 'vue'
import TaskBoardSalute from './TaskBoardSalute.vue'
import { useTaskStore } from '@/stores/taskStore'
import { calculateFontSize } from '@/utils/calculateFontSize'

const taskStore = useTaskStore()

const isRoundEnd = computed(
	() =>
		taskStore.exerciseScore.index === taskStore.exerciseScore.exercises.length
)

const fontSize = computed(
	() =>
		`min(min(50vw, ${calculateFontSize(taskStore.exerciseText.length)}), 48vh)`
)
</script>

<template>
	<div class="task-board-content wrapper-center">
		<Transition :name="taskStore.options.slideBack ? 'slideback' : 'slide'">
			<div
				:class="{ 'text-uppercase': taskStore.options.upper }"
				class="sample"
				:style="{ fontSize }"
				v-if="taskStore.exerciseText"
				:key="taskStore.exerciseText">
				{{ taskStore.exerciseText }}
			</div>
		</Transition>
		<Transition :name="taskStore.options.slideBack ? 'slideback' : 'slide'">
			<TaskBoardSalute v-show="isRoundEnd" />
		</Transition>
	</div>
</template>

<style scoped lang="scss">
.task-board-content {
	position: relative;
	.sample {
		position: absolute;
		width: 100%;
		text-align: center;
		line-height: 1;
		transform-origin: center;
	}
}

.slide-enter-active,
.slideback-enter-active,
.slide-leave-active,
.slideback-leave-active {
	transition: all 0.5s ease-out;
}

.slide-leave-to,
.slideback-enter-from {
	transform: translateX(-100vw);
}
.slide-enter-from,
.slideback-leave-to {
	transform: translateX(100vw);
}
</style>
