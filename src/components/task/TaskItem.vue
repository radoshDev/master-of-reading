<script setup lang="ts">
import { computed, onMounted } from 'vue'
import ExercisesList from '@/components/task/ExercisesList.vue'
import TaskBoard from '@/components/task/TaskBoard.vue'
import { ROUTE_NAMES } from '@/constants'
import { useTaskStore } from '@/stores/taskStore'
import { tasks } from '@/stores/taskStore'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useWordStore } from '@/stores/wordStore'
import { useQuasar } from 'quasar'

const taskStore = useTaskStore()
const pokemonStore = usePokemonStore()
const wordStore = useWordStore()
const $q = useQuasar()

const exercise = computed(() => tasks[taskStore.taskType])

const showContinueBtn = computed(
	() => taskStore.exerciseScore?.exercises.length > 0
)

function handleStartTask() {
	pokemonStore.setIndex()
	taskStore.startTask()
}

function handleContinueTask() {
	taskStore.showTask = true
}
onMounted(async () => {
	if (taskStore.taskType !== 'words') return
	try {
		$q.loading.show()
		await wordStore.fetchWords()
	} catch (error) {
		$q.notify({
			message: 'Не можу завантажити слова. Щось пішло не так...',
			position: 'top',
			color: 'negative',
		})
	} finally {
		$q.loading.hide()
	}
})
</script>

<template>
	<div class="task-item_header">
		<q-btn
			icon="arrow_back_ios_new"
			flat
			size="1.05rem"
			:to="{ name: ROUTE_NAMES.home }" />
		<h2 class="title">{{ exercise.title }}</h2>
	</div>
	<ExercisesList :sub-tasks="exercise.subtasks" />
	<div class="task-item_actions">
		<q-btn
			v-if="taskStore.exerciseScore"
			@click="handleStartTask"
			label="Початок"
			color="blue-8"
			class="btn"
			size="1.05rem" />
		<q-btn
			@click="handleContinueTask"
			label="Продовжити"
			color="yellow-9"
			class="btn"
			size="1.05rem"
			v-if="showContinueBtn" />
	</div>
	<TaskBoard />
</template>

<style scoped lang="scss">
.task-item_header {
	display: flex;
	gap: 1rem;
	align-items: center;
	margin: 0 0 1rem;
	.title {
		font-size: 2.5rem;
		font-weight: bold;
		margin: 0;
	}
}
.task-item_actions {
	display: flex;
	justify-content: center;
	gap: 25px;
	flex-wrap: wrap;
	.btn {
		min-width: 150px;
	}
}
</style>
