<template>
	<main class="flex  w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  container px-5">
		<section class="flex flex-col">
			<Construction class="h-52 w-52" />
			<h1 class="text-3xl font-bold text-center mt-4">
				Coming soon
			</h1>
		</section>
	</main>
</template>

<script setup lang="ts">
import { Construction } from 'lucide-vue-next'






definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
