<template>
	<main class="w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  px-5 ">
		<div class="container justify-between flex flex-col md:flex-row gap-20 py-12 ">
			<DashboardCreateFeedback />
			<div v-if="!loading" class="flex flex-col gap-4 w-full max-w-2xl">
				<DashboardUpvoteCard v-for="sample in feedbacks" :key="sample.id" :data="sample" :show-footer="true" />
			</div>
			<Skeleton v-else height="500px" radius="8px" />
		</div>
	</main>
</template>

<script setup lang="ts">

import { useFetchBoardFeedbacks } from '@/composables/board/feedbacks/fetch'




const { feedbacks, fetchBoardFeedbacks, loading } = useFetchBoardFeedbacks()

const id = useRoute().params.id as string

 fetchBoardFeedbacks(id)




definePageMeta({
	layout: 'public',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
