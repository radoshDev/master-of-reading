<script setup lang="ts">
import { computed } from 'vue'
import TaskBoardSalute from './TaskBoardSalute.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const isRoundEnd = computed(
	() =>
		taskStore.exerciseScore.index === taskStore.exerciseScore.exercises.length
)
</script>

<template>
	<div class="main wrapper-center">
		<div class="sample" v-if="taskStore.exerciseText">
			{{ taskStore.exerciseText }}
		</div>
		<TaskBoardSalute v-show="isRoundEnd" />
	</div>
</template>

<style scoped lang="scss">
.main {
	.sample {
		font-size: min(50vw, 48vh);
		line-height: 1;
	}
}
</style>
