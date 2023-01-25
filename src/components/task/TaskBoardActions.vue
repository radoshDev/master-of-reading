<script setup lang="ts">
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useTaskStore } from '@/stores/taskStore'
import { convertToRussish } from '@/utils/convertToRussish'
import { computed } from 'vue'

const taskStore = useTaskStore()
const pokemonStore = usePokemonStore()
const { speak, speaking } = useSpeechSynthesis()

const isRoundEnd = computed(
	() =>
		taskStore.exerciseScore.index === taskStore.exerciseScore.exercises.length
)

function handlePrev() {
	const currentIndex = taskStore.exerciseScore.index
	const taskLength = taskStore.exerciseScore.exercises.length
	if (currentIndex === taskLength) {
		taskStore.exerciseScore.earned -= 1
	}
	taskStore.exerciseScore.index -= 1
}

function handleNext() {
	speak({
		text: convertToRussish(taskStore.exerciseText),
		voiceLang: 'ru-RU',
		onEnd: () => {
			const currentIndex = taskStore.exerciseScore.index
			const taskLength = taskStore.exerciseScore.exercises.length
			taskStore.exerciseScore.index = currentIndex + 1

			if (currentIndex + 1 === taskLength) {
				taskStore.exerciseScore.earned += 1
			}
		},
	})
}

function handleMore() {
	taskStore.nextRound()
	pokemonStore.setIndex()
}
</script>

<template>
	<div class="task-board-actions">
		<q-btn
			@click="handlePrev"
			icon="arrow_back_ios"
			label="Назад"
			size="1rem"
			:disable="taskStore.exerciseScore.index === 0" />
		<q-btn
			@click="handleMore"
			v-if="isRoundEnd"
			label="Ще"
			icon-right="add"
			size="1rem"
			text-color="black"
			color="green-13" />
		<q-btn
			v-else
			@click="handleNext"
			:disable="speaking"
			icon-right="arrow_forward_ios"
			label="Вперед"
			color="blue-5"
			text-color="black"
			size="1rem" />
	</div>
</template>

<style lang="scss">
.task-board-actions {
	display: flex;
	gap: 25px;
	justify-content: center;
	align-items: center;
}
</style>