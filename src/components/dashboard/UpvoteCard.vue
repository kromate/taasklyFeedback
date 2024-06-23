<template>
	<article class="flex flex-col gap-2  border-[1.5px] border-dark bg-light p-4 rounded-md w-full transite cursor-pointer hover:btn_shadow" @click="useRouter().push(`/b/${board_id}/${data.id}`)">
		<div class="flex items-center justify-between gap-2">
			<div class="flex flex-col gap-2">
				<h1 class="font-semibold text-xl">
					{{ data.title }}
				</h1>
				<p>
					{{ data.desc }}
				</p>
			</div>
			<div class="flex flex-col items-center justify-center border border-dark rounded-[4.5px] py-1 min-w-[50px]  hover:btn_shadow">
				<ChevronUp />
				<p class="text-dark">
					{{ data.upvotes }}
				</p>
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

const board_id = useRoute().params.id as string

type feedbackType = {
    title: string
    desc: string
    upvotes: number
    comment_count?: number
    comment_ids?: Array<string>
    id: string
}
defineProps<{
	data: feedbackType
	showFooter?: boolean
}>()


</script>

<style scoped>

</style>
