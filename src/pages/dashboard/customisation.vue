<template>
	<SubMenu />
	<main class="flex center w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)] polkadot">
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
import SubMenu from '@/components/layouts/SubMenu.vue'


definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
