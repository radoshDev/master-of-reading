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
	padding: 0 15px;
	margin-inline: auto;
	height: 100vh;
}
</style>
