<script lang="ts" setup>
import { ROUTE_NAMES } from '@/constants'
import { tasks } from '@/stores/taskStore'
import TaskCard from './task/TaskCard.vue'
</script>

<template>
	<div class="tasks-menu">
		<router-link
			v-for="(task, type) in tasks"
			:key="type"
			:to="{ name: ROUTE_NAMES.task, params: { type } }"
			class="task-wrapper">
			<TaskCard :task="task" class="menu-task" />
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
.tasks-menu {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	gap: 25px;
	.task-wrapper {
		width: 100%;
		@media (min-width: 500px) {
			width: auto;
		}
		.menu-task {
			font-size: 1.8rem;
			height: 125px;
			& > :first-child {
				height: 100%;
			}
			@media (min-width: 500px) {
				flex-direction: column;
				height: 200px;
				width: 300px;
				font-size: 1.5rem;
				& > :first-child {
					width: 100%;
					height: 100px;
					flex: 1;
				}
			}
		}
	}
}
</style>
