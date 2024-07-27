<template>
	<article class="flex flex-col gap-2  border-[1.5px] border-dark bg-light p-4 rounded-md w-full transite cursor-pointer hover:btn_shadow" @click="useRouter().push(`/${type}/${type === 'b' ? board.id : board.custom_link}/${data.id}`)">
		<div class="flex items-center justify-between gap-2">
			<div class="flex flex-col gap-2">
				<h1 class="font-semibold md:text-xl text-lg flex items-center gap-4">
					{{ data.title }}
					<ColorBadge v-if="data?.status" :name="data?.status" />
				</h1>
				<p class="text-sm md:text-base">
					{{ data.desc }}
				</p>
			</div>
			<div
				class="flex flex-col items-center justify-center border border-dark rounded-[4.5px] py-1 min-w-[50px]  hover:btn_shadow"
				:class="[hasUpvoted ? 'bg-grey_two !text-light' : 'bg-light text-dark']"
				@click.stop="hasUpvoted ? downVote(board.id, data.id) : upVote(board.id, data.id)"
			>
				<ChevronUp />
				<p v-if="!loading">
					{{ data.upvotes }}
				</p>
				<Spinner v-else size="16px" class="!border-dark !border-t-gray-600" />
			</div>
		</div>

		<footer v-if="showFooter" class="mt-auto">
			<div class="flex items-center gap-1 mt-2">
				<MessageSquare :size="20" />
				<span>{{ data.comment_ids?.length || 0 }}</span>
			</div>
		</footer>
	</article>
</template>

<script setup lang="ts">
import { ChevronUp, MessageSquare } from 'lucide-vue-next'
import { useUpdateBoardFeedback } from '@/composables/board/feedbacks/vote'
import { useUser } from '@/composables/auth/user'


const board_props_id = useRoute().params.id



const type = useRoute().params.type as string


const { currentUserId } = useUser()

const { downVote, upVote, loading } = useUpdateBoardFeedback()

const hasUpvoted = computed(() => props.data.upvote_ids?.includes(currentUserId.value))

type feedbackType = {
    title: string
    desc: string
    status?: string
    upvotes: number
    comment_count?: number
    comment_ids?: Array<string>
    upvote_ids?: Array<string>
    id: string
}
const props = defineProps<{
	data: feedbackType
	board:Record<string, any>
	showFooter?: boolean
}>()


</script>

<style scoped>

</style>
