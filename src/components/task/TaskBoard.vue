<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import LayoutMain from '@/components/LayoutMain.vue'
import TaskBoardOptions from '@/components/task/TaskBoardOptions.vue'
import CoinSvg from '@/components/ui/CoinSvg.vue'
import type { TaskType } from '@/types/Task'
import { computed } from 'vue'
import TaskBoardActions from './TaskBoardActions.vue'

const props = defineProps<{ taskType: TaskType }>()

const taskStore = useTaskStore()

const exercise = computed(() => {
	const exerciseType = taskStore.selectedExercise[props.taskType]
	const exerciseObj = taskStore.tasksScore[props.taskType][exerciseType]
	const exerciseIndex = exerciseObj.index
	return exerciseObj.exercises[exerciseIndex]
})

function handleCloseTask() {
	taskStore.showTask = false
}
</script>

<template>
	<Teleport to="body">
		<Transition name="show">
			<q-card class="task-board" v-if="taskStore.showTask">
				<LayoutMain class="task-board-wrapper">
					<div class="header">
						<q-btn
							class="q-mt-sm"
							icon="close"
							round
							color="negative"
							size="md"
							@click="handleCloseTask" />
						<CoinSvg :count="0" class="coin" />
						<TaskBoardOptions />
					</div>
					<div class="sample">{{ exercise }}</div>
					<TaskBoardActions :task-type="taskType" />
				</LayoutMain>
			</q-card>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
.task-board {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	padding: 1rem 0 2rem;
	.task-board-wrapper {
		display: flex;
		flex-direction: column;
		max-height: 100%;
		.header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			.coin {
				width: 100px;
			}
		}
		.sample {
			flex: 1;

			font-size: 50vw;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
.show-enter-active,
.show-leave-active {
	transition: all 0.5s ease;
}

.show-leave-to,
.show-enter-from {
	transform: translateY(-100%);
	opacity: 0;
}
</style>
