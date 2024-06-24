<template>
	<article class="flex flex-col gap-2 justify-between border-[1.5px] border-dark bg-light p-4 rounded-md w-full  transite cursor-pointer hover:btn_shadow">
		<div class="flex flex-col md:flex-row items-start justify-between gap-4">
			<div class="flex flex-col gap-2">
				<h1 class="font-semibold text-xl">
					{{ data.title }}
				</h1>
				<p>
					{{ data.desc }}
				</p>
			</div>
			<div class="flex flex-col gap-2  items-center justify-center rounded-[4.5px] py-1 min-w-[50px] w-full md:w-auto">
				<select id="status" v-model="data.status" name="status" class="input-field" @change="onStatusChange($event, board_id, data.id)">
					<option v-for="status in statusKeys" :value="status.value">
						{{ status.name }}
					</option>
				</select>
				<a :href="`http://${host}/b/${board_id}/${data.id}`" target="_blank" class="btn-primary w-full gap-2">View <MoveUpRight :size="18" /></a>
				<button class="btn btn-primary w-full gap-2" @click="setDeleteFeedbackId(board_id, data.id)">
					Delete
				</button>
			</div>
		</div>

		<footer class="mt-auto flex gap-4 items-center">
			<div class="flex items-center gap-1 mt-2">
				<ChevronUp :size="20" />
				<span>{{ data.upvotes || 0 }}</span>
			</div>
			<div class="flex items-center gap-1 mt-2">
				<MessageSquare :size="16" />
				<span>{{ data.comment_ids?.length || 0 }}</span>
			</div>
		</footer>
	</article>
</template>

<script setup lang="ts">
import { ChevronUp, MessageSquare, MoveUpRight } from 'lucide-vue-next'
import { useUpdateBoardFeedback } from '@/composables/board/feedbacks/vote'
import { useDeleteFeedback } from '@/composables/board/feedbacks/delete'

const { statusKeys, onStatusChange } = useUpdateBoardFeedback()


const { setDeleteFeedbackId } = useDeleteFeedback()



const host = computed(() => {
	return location.host
})
const board_id = useRoute().params.id as string

type feedbackType = {
    title: string
    desc: string
	upvotes: number
	comment_count?: number
	status?: string
	comment_ids?: Array<string>
	upvote_ids?: Array<string>
    id: string
}
const props = defineProps<{
	data: feedbackType
	showFooter?: boolean
}>()


</script>

<style scoped>

</style>
