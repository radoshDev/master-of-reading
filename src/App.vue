<script setup lang="ts">
import LayoutMain from '@/components/LayoutMain.vue'
import { onMounted } from 'vue'
import { usePokemonStore } from './stores/pokemonStore'

const pokemonStore = usePokemonStore()

onMounted(() => {
	pokemonStore.setPokemons()
})
</script>

<template>
	<LayoutMain>
		<router-view />
	</LayoutMain>
</template>
