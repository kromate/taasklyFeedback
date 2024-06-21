<template>
	<SubMenu />
	<main class="w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  px-5 ">
		<div class="container flex flex-col md:flex-row gap-20 py-12 ">
			<DashboardCreateBoard />
			<DashboardBoardList :boards="boards" :loading="loading" />
		</div>
	</main>
</template>

<script setup lang="ts">
import SubMenu from '@/components/layouts/SubMenu.vue'
import { useFetchUserBoards } from '@/composables/board/fetch'

const { boards, fetchUserBoards, loading } = useFetchUserBoards()

fetchUserBoards()

definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
