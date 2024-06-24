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
import { useCustomHead } from '@/composables/core/head'
import { useFetchUserBoardById } from '@/composables/board/id'



const { feedbacks, fetchBoardFeedbacks, loading } = useFetchBoardFeedbacks()
const { board, fetchUserBoardById } = useFetchUserBoardById()

const id = useRoute().params.id as string

 fetchBoardFeedbacks(id)
 await fetchUserBoardById(id)

useCustomHead({
	title: `${board.value.title} | Feedback`,
	desc: board.value.desc,
	img: '/og.png'
})




definePageMeta({
	layout: 'public'
})
</script>

<style scoped>

</style>
