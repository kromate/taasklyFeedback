<template>
	<main class="w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  px-5 ">
		<div class="container  flex flex-col md:flex-row gap-20 py-12 ">
			<section class="w-full">
				<div v-if="!feedbackLoading" class="flex items-start  gap-4 max-w-2xl">
					<div class="flex flex-col items-center justify-center border border-dark rounded-[4.5px] py-1 min-w-[50px]  hover:btn_shadow"
						:class="[hasUpvoted ? 'bg-grey_two !text-light' : 'bg-light text-dark']"
						@click.stop="hasUpvoted ? downVote(board_id, feedback.id) : upVote(board_id, feedback.id)"
					>
						<ChevronUp />
						<p>
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
import { useUpdateBoardFeedback } from '@/composables/board/feedbacks/vote'
import { useUser } from '@/composables/auth/user'




const id = useRoute().params.pid as string
const board_id = useRoute().params.id as string

const { feedback, fetchBoardFeedbackById, loading: feedbackLoading } = useFetchBoardFeedbackById()

fetchBoardFeedbackById(board_id, id)

const { currentUserId } = useUser()

const { downVote, upVote, loading } = useUpdateBoardFeedback()

const hasUpvoted = computed(() => feedback.value.upvote_ids?.includes(currentUserId.value))



definePageMeta({
	layout: 'public',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
