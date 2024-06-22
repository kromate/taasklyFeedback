<template>
	<main class="w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  px-5 ">
		<div class="container justify-between flex flex-col md:flex-row gap-20 py-12 ">
			<DashboardCreateFeedback />
			<div class="flex flex-col gap-4 w-full max-w-2xl">
				<DashboardUpvoteCard v-for="sample in feedbacks" :key="sample.id" :data="sample" :show-footer="true" />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">

import { useFetchBoardFeedbacks } from '@/composables/board/feedbacks/fetch'

const { feedbacks, fetchBoardFeedbacks, loading } = useFetchBoardFeedbacks()

const id = useRoute().params.id as string

fetchBoardFeedbacks(id)

const demo_feedback = [
	{ id: 'a1b2c3d4e', title: 'Google Calendar integration', desc: 'I would be willing to pay extra for a calendar integration', upvotes: 123 },
	{ id: 'f5g6h7i8j', title: 'Mobile App Enhancements', desc: 'The mobile app needs to be more responsive and user-friendly.', upvotes: 85 },
	{ id: 'k9l0m1n2o', title: 'Additional Language Support', desc: 'Please add support for more languages, especially Spanish and French.', upvotes: 78 }
]

definePageMeta({
	layout: 'public',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
