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
	padding: 15px 15px 25px;
	margin-inline: auto;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}
</style>
