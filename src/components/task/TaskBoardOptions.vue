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
					round
					:ripple="false"
					:color="taskStore.options.mute ? 'red-7' : 'blue-14'"
					:icon="taskStore.options.mute ? 'volume_off' : 'volume_up'"
					flat />
				<q-btn
					@click="toggleLetterCase"
					round
					:ripple="false"
					color="blue-14"
					no-caps
					:label="taskStore.options.upper ? 'AA' : 'aa'"
					size="1rem"
					padding="0 10px"
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
	min-width: 100px;
}
</style>
