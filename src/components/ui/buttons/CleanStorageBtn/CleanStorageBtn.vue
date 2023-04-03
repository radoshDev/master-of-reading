<script setup lang="ts">
import { ref } from 'vue'

const isModal = ref(false)
function handleCleanStorage() {
	localStorage.clear()
}
</script>

<template>
	<div>
		<q-btn
			flat
			icon="cleaning_services"
			@click="isModal = true"
			color="primary" />
		<q-dialog v-model="isModal">
			<q-card>
				<q-card-section>
					<div class="text-h6">Очищення Кешу</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					Ця дія очистить кеш. І весь прогрес буде втрачено. Продовжити?
				</q-card-section>

				<q-card-actions align="right">
					<q-btn label="Відміна" color="negative" flat v-close-popup />
					<q-btn
						flat
						label="OK"
						@click="handleCleanStorage"
						color="primary"
						v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>
