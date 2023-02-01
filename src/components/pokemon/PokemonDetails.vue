<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import { useQuasar } from 'quasar'
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $q = useQuasar()
const pokemonStore = usePokemonStore()
const route = useRoute()
const router = useRouter()
const pokemonId = Number(route.params['id'])

const currentPokemon = computed(() =>
	pokemonStore.pokemons.data.find(pok => pok.id === pokemonId)
)
const evolutions = computed(() => {
	return pokemonStore.pokemonEvolution.map(pokemonName =>
		pokemonStore.pokemons.data.find(pok => pok.name === pokemonName)
	)
})

function closePage() {
	router.back()
}

onMounted(async () => {
	try {
		$q.loading.show()
		await pokemonStore.fetchEvolution(pokemonId)
	} catch (error) {
		$q.notify({
			message: 'Problem to load evolution chain',
			position: 'top',
			color: 'negative',
		})
	} finally {
		$q.loading.hide()
	}
})
</script>

<template>
	<div class="pokemon-details">
		<q-btn
			@click="closePage"
			round
			icon="close"
			color="negative"
			class="close-btn"
			size="sm" />
		<div class="header" :class="{ single: evolutions.length === 0 }">
			<q-img
				:src="currentPokemon?.dreamworld"
				:alt="currentPokemon?.name"
				:width="evolutions.length === 0 ? '100%' : '100px'" />
			<div class="info">
				<div class="title">{{ currentPokemon?.name }}</div>
			</div>
		</div>
		<template v-if="evolutions.length > 0">
			<div class="text-bold text-h5 q-my-md text-center">Evolution chart</div>
			<div class="chart">
				<div v-for="pokemon in evolutions" :key="pokemon?.name">
					<q-img :src="pokemon?.dreamworld" :alt="pokemon?.name" width="90px" />
					<div>
						{{ pokemon?.name }}
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<style scoped lang="scss">
.pokemon-details {
	position: relative;
	.close-btn {
		position: absolute;
		top: 0;
		right: 0;
	}
	.header {
		display: flex;
		flex-direction: row;
		gap: 1.5rem;
		&.single {
			flex-direction: column;
			align-items: center;
		}
		.info {
			.title {
				font-size: 2rem;
				text-transform: capitalize;
			}
		}
	}
	.chart {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		text-align: center;
		text-transform: capitalize;
	}
}
</style>
