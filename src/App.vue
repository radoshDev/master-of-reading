<script setup lang="ts">
import { onMounted } from 'vue'
import LayoutMain from '@/components/LayoutMain.vue'
import { usePokemonStore } from '@/stores/pokemonStore'

const pokemonStore = usePokemonStore()

onMounted(() => {
	pokemonStore.fetchPokemons()
})
</script>

<template>
	<LayoutMain>
		<router-view />
	</LayoutMain>
</template>
