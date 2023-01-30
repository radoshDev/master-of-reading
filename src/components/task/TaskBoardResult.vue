<script setup lang="ts">
import CoinSvg from '@/components/ui/CoinSvg.vue'
import { useTaskStore } from '@/stores/taskStore'
import type { ExerciseScore } from '@/types/Task'

const taskStore = useTaskStore()
function changeAction(type: ExerciseScore['action']) {
	taskStore.exerciseScore.action = type
}
</script>

<template>
	<div class="task-board_result">
		<CoinSvg :count="taskStore.exerciseScore.result" class="coin" />
		<q-menu anchor="bottom middle" self="top middle">
			<div class="result-menu">
				<div class="flex">
					<div>Монет:</div>
					<q-input
						type="tel"
						v-model.number="taskStore.exerciseScore.result"
						@update:model-value="
							val => (taskStore.exerciseScore.result = Number(val) || 0)
						"
						outlined
						dense
						placeholder="0" />
				</div>
				<div class="flex justify-center">
					<div>
						{{
							taskStore.exerciseScore.action === 'add'
								? 'Додавати'
								: 'Віднімати'
						}}
					</div>
					<div class="flex no-wrap">
						<q-btn
							@click="changeAction('add')"
							icon="arrow_upward"
							flat
							round
							:color="
								taskStore.exerciseScore.action === 'add' ? 'positive' : 'grey'
							" />
						<q-btn
							@click="changeAction('subtract')"
							icon="arrow_downward"
							flat
							round
							:color="
								taskStore.exerciseScore.action === 'subtract'
									? 'negative'
									: 'grey'
							" />
					</div>
				</div>
			</div>
		</q-menu>
	</div>
</template>

<style scoped lang="scss">
.task-board_result {
	.coin {
		width: 90px;
	}
}

.result-menu {
	padding: 0.5rem;
	display: flex;
	gap: 1rem;
	max-width: 250px;
	.q-btn {
		.q-icon {
			font-size: 2em;
		}
	}
}
</style>
