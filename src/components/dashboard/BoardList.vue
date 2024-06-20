<template>
	<section class="flex flex-col w-full">
		<h1 class="text-xl font-bold mb-4">
			1 Board
		</h1>
		<div class="grid grid-cols-2 gap-4 w-full">
			<div v-for="n in 4" :key="n" class="flex flex-col p-4 border border-dark w-full rounded shadow-md">
				<h1 class="text-lg font-medium">
					Title
				</h1>
				<p class="text-sm">
					The Emulator Suite UI supports multiple DBs by editing the database name in the URL.
				</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>
