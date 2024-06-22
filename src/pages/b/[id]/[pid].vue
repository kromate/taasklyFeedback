<template>
	<main class="w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  px-5 ">
		<div class="container  flex flex-col md:flex-row gap-20 py-12 ">
			<section class="w-full">
				<div v-if="!feedbackLoading" class="flex items-center  gap-4 max-w-2xl">
					<div class="flex flex-col items-center justify-center border border-dark rounded-[4.5px] py-1 min-w-[50px]  hover:btn_shadow">
						<ChevronUp />
						<p class="text-dark">
							{{ feedback.upvotes }}
						</p>
					</div>
					<div class="flex flex-col gap-2">
						<h1 class="font-semibold text-xl">
							{{ feedback.title }}
						</h1>
						<p>
							{{ feedback.desc }}
						</p>
					</div>
				</div>
				<Skeleton v-else height="300px" radius="8px" />
			</section>
			<section class="w-full flex flex-col gap-8 max-w-lg">
				<CreateComment />
				<CommentList />
			</section>
		</div>
	</main>
</template>

<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next'
import CreateComment from '@/components/dashboard/CreateComment.vue'
import CommentList from '@/components/dashboard/CommentList.vue'
import { useFetchBoardFeedbackById } from '@/composables/board/feedbacks/id'




const id = useRoute().params.pid as string
const board_id = useRoute().params.id as string

const { feedback, fetchBoardFeedbackById, loading: feedbackLoading } = useFetchBoardFeedbackById()

fetchBoardFeedbackById(board_id, id)

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
