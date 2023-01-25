<script setup lang="ts"></script>

<template>
	<div class="container">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.container {
	width: 100%;
	max-width: 1024px;
	padding: 20px;
	margin-inline: auto;
	min-height: 100vh;
}
</style>
