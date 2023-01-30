<script setup lang="ts">
import { onMounted } from 'vue'
import LayoutMain from '@/components/LayoutMain.vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import { useWordStore } from '@/stores/wordStore'

const pokemonStore = usePokemonStore()
const wordStore = useWordStore()

onMounted(() => {
	pokemonStore.fetchPokemons()
	wordStore.fetchWords()
})
</script>

<template>
	<LayoutMain>
		<router-view />
	</LayoutMain>
</template>
