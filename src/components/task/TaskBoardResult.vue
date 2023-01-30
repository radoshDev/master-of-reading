<script setup lang="ts">
import CoinSvg from '@/components/ui/CoinSvg.vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
</script>

<template>
	<CoinSvg :count="taskStore.exerciseScore.earned" class="coin" />
</template>

<style scoped lang="scss">
.coin {
	width: 90px;
}
</style>
