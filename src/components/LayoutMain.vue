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
	padding: 10px 15px 90px;
	margin-inline: auto;
	max-height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
