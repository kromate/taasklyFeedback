<template>
	<main class="w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  px-5 ">
		<div class="container flex gap-20 py-12 ">
			<DashboardCreateBoard />
			<DashboardBoardList />
		</div>
	</main>
</template>

<script setup lang="ts">







definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
