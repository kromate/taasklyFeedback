<template>
	<div class="w-full">
		<section v-if="!loading" class="flex flex-col w-full">
			<h1 class="text-lg font-semibold mb-4">
				{{ comments.length }} {{ comments.length === 1 ? 'Comment' : 'Comments' }}
			</h1>
			<div class="flex flex-col gap-4 w-full">
				<article v-for="comment in comments" :key="comment.id" :to="`/dashboard/${comment.id}`" class="flex flex-col p-4 border border-dark w-full rounded shadow-md hover:btn_shadow">
					<p class="text-base">
						{{ comment.comment }}
					</p>
					<footer class="flex items-center mt-4 ">
						<Avatar :src="comment.user_phone" :name="comment.user_name" :size="24" class="w-8 h-8 mr-2" />
						<span class="text">{{ comment.user_name }}</span>
						<Dot />
						<span class="text-sm">{{ formatDate(comment.created_at, 'dateInput') }}</span>
						<Dot v-if="currentUserId === comment.user_id" />
						<button v-if="currentUserId === comment.user_id" class="text-sm underline" @click="setDeleteCommentId(board_id, feedback_id, comment.id)">
							Delete
						</button>
					</footer>
				</article>
			</div>
		</section>

		<div v-else class="flex flex-col w-full">
			<span class="text-xl font-bold mb-4">Loading comments..</span>
			<Skeleton height="300px" radius="8px" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { Dot } from 'lucide-vue-next'
import { formatDate } from '@/composables/utils/formatter'
import { useFetchFeadbackComments } from '@/composables/board/feedbacks/comments/fetch'
import { useDeleteComment } from '@/composables/board/feedbacks/comments/delete'
import { useUser } from '@/composables/auth/user'

const { currentUserId } = useUser()

const { setDeleteCommentId } = useDeleteComment()




const { comments, fetchFeadbackComments, loading } = useFetchFeadbackComments()

const board_id = useRoute().params.id as string
const feedback_id = useRoute().params.pid as string

fetchFeadbackComments(board_id, feedback_id)
</script>

<style scoped>
.disc{
	@apply text-sm font-normal flex gap-2 items-center p-1 px-3 bg-[#1d1b1b] rounded-lg text-white;
}
</style>
