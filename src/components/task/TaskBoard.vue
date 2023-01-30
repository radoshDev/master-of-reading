<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import LayoutMain from '@/components/LayoutMain.vue'
import TaskBoardOptions from '@/components/task/TaskBoardOptions.vue'
import TaskBoardActions from './TaskBoardActions.vue'
import TaskBoardProgress from './TaskBoardProgress.vue'
import TaskBoardContent from './TaskBoardContent.vue'
import TaskBoardResult from './TaskBoardResult.vue'

const taskStore = useTaskStore()

function handleCloseTask() {
	taskStore.showTask = false
}
</script>

<template>
	<Teleport to="body">
		<Transition name="show">
			<q-card class="task-board" v-if="taskStore.showTask">
				<LayoutMain>
					<div class="header">
						<div class="row">
							<q-btn
								class="q-mt-sm"
								icon="close"
								round
								color="negative"
								size="md"
								@click="handleCloseTask" />
							<TaskBoardResult />
							<TaskBoardOptions />
						</div>
						<TaskBoardProgress />
					</div>
					<TaskBoardContent />
					<TaskBoardActions />
				</LayoutMain>
			</q-card>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
.task-board {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	.header {
		.row {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
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
