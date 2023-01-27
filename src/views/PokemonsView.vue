<script setup lang="ts">
import PokemonList from '@/components/pokemon/PokemonList.vue'
import { ROUTE_NAMES } from '@/constants'
</script>

<template>
	<q-btn
		:to="{ name: ROUTE_NAMES.home }"
		label="До занять"
		class="btn"
		color="blue-14" />
	<PokemonList />
</template>

<style scoped lang="scss">
.btn {
	align-self: flex-start;
	margin-bottom: 20px;
}
</style>
