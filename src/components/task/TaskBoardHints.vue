<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ word: string }>()

const isDefinition = ref(false)
const isImage = ref(false)
</script>

<template>
	<div>
		<q-btn
			flat
			round
			icon="help"
			color="amber-10"
			class="q-mr-sm"
			@click="isDefinition = true" />
		<q-btn
			flat
			round
			icon="collections"
			color="positive"
			@click="isImage = true" />
		<q-btn
			flat
			round
			icon="travel_explore"
			color="red-13"
			:href="`https://www.google.com/search?q=${word}&tbm=isch`"
			target="_blank" />
	</div>
	<q-dialog v-model="isDefinition">
		<q-card class="hits-card">
			<q-card-section>
				<div class="text-h6">Пояснення слова</div>
				<q-btn
					class="close-btn"
					icon="close"
					round
					color="negative"
					size="sm"
					@click="isDefinition = false" />
			</q-card-section>
			<q-separator />
			<q-card-section class="q-pa-none">
				<iframe
					:src="`https://slovnyk.ua/index.php?swrd=${word}`"
					style="height: 70vh; width: 100%" />
			</q-card-section>
		</q-card>
	</q-dialog>
	<q-dialog v-model="isImage">
		<q-card class="hits-card">
			<q-card-section>
				<div class="text-h6">Зображення до слова</div>
				<q-btn
					class="close-btn"
					icon="close"
					round
					color="negative"
					size="sm"
					@click="isImage = false" />
			</q-card-section>
			<q-separator />
			<q-card-section class="q-pa-none">
				<iframe
					:src="`https://www.bing.com/images/search?q=${word}&first=1`"
					style="height: 70vh; width: 100%" />
			</q-card-section>
		</q-card>
	</q-dialog>
</template>

<style scoped lang="scss">
.hits-card {
	width: 100%;
	max-width: 90vw;
}
.close-btn {
	position: absolute;
	top: 5px;
	right: 5px;
	z-index: 99;
}
</style>
