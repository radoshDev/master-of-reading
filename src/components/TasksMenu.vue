<script lang="ts" setup>
import { ROUTE_NAMES } from '@/constants'
import { useTaskStore } from '@/stores/taskStore'
const taskStore = useTaskStore()
</script>

<template>
	<div class="tasks-menu">
		<router-link
			v-for="(task, type) in taskStore.tasks"
			:key="type"
			:to="{ name: ROUTE_NAMES.task, params: { type } }">
			<q-card class="menu-item">
				<q-card-section>
					<q-img
						:src="task.img.src"
						:alt="task.img.name"
						width="100px"
						height="100px" />
				</q-card-section>
				<q-card-section>
					<div class="title">{{ task.title }}</div>
				</q-card-section>
			</q-card>
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
	.menu-item {
		width: 250px;
		text-align: center;
		.title {
			font-size: 1.5rem;
			font-weight: bold;
		}
	}
}
</style>
