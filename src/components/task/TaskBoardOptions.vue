<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
function toggleMute() {
	taskStore.options.mute = !taskStore.options.mute
}
function toggleLetterCase() {
	taskStore.options.upper = !taskStore.options.upper
}
</script>

<template>
	<q-btn icon="more_vert" size="1.1rem" flat round>
		<q-menu>
			<div class="menu-content">
				<q-btn
					@click="toggleMute"
					:icon="taskStore.options.mute ? 'volume_up' : 'volume_off'"
					flat />
				<q-btn
					@click="toggleLetterCase"
					no-caps
					:label="taskStore.options.upper ? 'aa' : 'AA'"
					flat />
			</div>
		</q-menu>
	</q-btn>
</template>

<style scoped lang="scss">
.menu-content {
	display: flex;
	gap: 10px;
	padding: 10px;
	min-width: 150px;
}
</style>
