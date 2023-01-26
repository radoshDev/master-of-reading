<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'
import LayoutMain from '@/components/LayoutMain.vue'
import TaskBoardOptions from '@/components/task/TaskBoardOptions.vue'
import CoinSvg from '@/components/ui/CoinSvg.vue'
import TaskBoardActions from './TaskBoardActions.vue'
import TaskBoardProgress from './TaskBoardProgress.vue'
import TaskBoardContent from './TaskBoardContent.vue'

const taskStore = useTaskStore()

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
						<CoinSvg :count="taskStore.exerciseScore.earned" class="coin" />
						<TaskBoardOptions />
					</div>
					<TaskBoardProgress />
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
