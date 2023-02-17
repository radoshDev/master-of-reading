<script setup lang="ts">
defineProps<{ word: string }>()
</script>

<template>
	<div>
		<q-btn
			flat
			round
			icon="help"
			color="amber-10"
			class="q-mr-sm"
			:href="`https://uk.wiktionary.org/wiki/${word}`"
			target="_blank" />
		<q-btn
			flat
			round
			icon="collections"
			color="positive"
			:href="`https://www.google.com/search?q=${word}&tbm=isch`"
			target="_blank" />
	</div>
</template>
