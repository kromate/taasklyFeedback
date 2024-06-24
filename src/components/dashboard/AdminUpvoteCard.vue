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
				<select id="" name="" class="input-field">
					<option v-for="status in statusKeys" :value="status.value">
						{{ status.name }}
					</option>
				</select>
				<a :href="`http://${host}/b/${board_id}/${data.id}`" target="_blank" class="btn-primary w-full gap-2">View <MoveUpRight :size="18" /></a>
				<button class="btn btn-primary w-full gap-2">
					Delete  <Trash :size="20" />
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
				<span>{{ data.comment_count || 0 }}</span>
			</div>
		</footer>
	</article>
</template>

<script setup lang="ts">
import { ChevronUp, MessageSquare, MoveUpRight, Trash } from 'lucide-vue-next'
import { useUpdateBoardFeedback } from '@/composables/board/feedbacks/vote'

const { statusKeys } = useUpdateBoardFeedback()



const host = computed(() => {
	return location.host
})
const board_id = useRoute().params.id as string

type feedbackType = {
    title: string
    desc: string
	upvotes: number
	comment_count?: number
    id: string
}
defineProps<{
	data: feedbackType
	showFooter?: boolean
}>()


</script>

<style scoped>

</style>
