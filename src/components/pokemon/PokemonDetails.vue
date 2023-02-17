<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
import { useQuasar } from 'quasar'
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const $q = useQuasar()
const pokemonStore = usePokemonStore()
const route = useRoute()
const router = useRouter()
const pokemonId = Number(route.params['id'])
const isLoadingEvolution = ref(false)

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
		isLoadingEvolution.value = true
		$q.loading.show()
		await pokemonStore.fetchEvolution(pokemonId)
	} catch (error) {
		$q.notify({
			message: 'Problem to load evolution chain',
			position: 'top',
			color: 'negative',
		})
	} finally {
		isLoadingEvolution.value = false
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
		<div class="header" :class="{ single: evolutions.length === 1 }">
			<q-img
				:src="currentPokemon?.dreamworld"
				:alt="currentPokemon?.name"
				class="main-img" />
			<div class="info">
				<div class="title">{{ currentPokemon?.name }}</div>
			</div>
		</div>
		<template v-if="evolutions.length > 1 && !isLoadingEvolution">
			<div class="text-bold text-h5 q-my-md text-center">Evolution chart</div>
			<div class="chart">
				<div v-for="pokemon in evolutions" :key="pokemon?.name">
					<q-img
						:src="pokemon?.dreamworld"
						:alt="pokemon?.name"
						height="300px"
						fit="contain" />
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
		position: sticky;
		top: 12px;
		right: 12px;
		z-index: 99;
		margin-left: auto;
		display: flex;
	}
	.header {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 1.5rem;
		&.single {
			flex-direction: column;
			align-items: center;
			.main-img {
				width: 100%;
				max-width: 450px;
			}
		}
		.main-img {
			width: 100px;
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
		text-align: center;
		text-transform: capitalize;
	}
}
</style>
