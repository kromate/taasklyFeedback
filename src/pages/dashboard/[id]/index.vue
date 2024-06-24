<template>
	<main v-if="!loading" class=" md:h-[calc(100vh-170px)] h-full  px-5 container flex justify-center w-full">
		<div class="w-full flex flex-col md:flex-row gap-24 md:py-12 py-6 justify-center">
			<div class="flex flex-col gap-9 w-full max-w-md">
				<h1 class="flex flex-col md:flex-row items-start gap-4 w-full max-w-full">
					<Undo2 class="border border-dark p-1 rounded-md cursor-pointer !min-w-[32px] !max-h-[32px] hover:btn_shadow transite " :size="32" @click="useRouter().back()" />
					<div class="flex flex-col">
						<span class="text-3xl font-bold">{{ board.title }}</span>
						<span class="text-base ">{{ board.desc }}</span>
						<div class="field mt-4">
							<label for="link" class="text-lg">Public link</label>
							<div class="input-field w-full py-4 flex items-center justify-between gap-5">
								<div class="select-all  text-base" @click="copyBoardLink(board.id)">
									{{ truncateString(`${host}/b/${board.id}`, 20) }}
								</div>

								<div class="gap-2 flex">
									<Copy class="cursor-pointer border border-dark p-1 rounded" :size="28" @click="copyBoardLink(board.id)" />
									<a :href="`http://${host}/b/${board.id}`" target="_blank"><MoveUpRight class="cursor-pointer border border-dark p-1 rounded" :size="28" /></a>
								</div>
							</div>
						</div>
					</div>
				</h1>
			</div>
			<div v-if="!feedbackLoading" class="max-w-2xl flex flex-col gap-4 w-full">
				<span class="text-3xl font-bold">{{ feedbacks.length }}  Posts</span>
				<div v-if="feedbacks.length" class="flex flex-col gap-4 w-full">
					<DashboardAdminUpvoteCard v-for="sample in feedbacks" :key="sample.id" :data="sample" />
				</div>
				<div v-else class="flex flex-col text-center py-12">
					<PenLine :size="64" class="mx-auto" />
					<h1 class="text-xl font-semibold">
						No feedback yet
					</h1>
					<p class="text-base italic">
						Share your board link to collect feedback from your users.
					</p>
				</div>
			</div>
		</div>
	</main>
	<Skeleton v-else height="500px" />
</template>

<script setup lang="ts">
import { Copy, Undo2, MoveUpRight, PenLine } from 'lucide-vue-next'
import { truncateString } from '@/composables/utils/formatter'
import { useFetchUserBoardById } from '@/composables/board/id'
import { useCopyToClipboard } from '@/composables/utils/share'
import { useFetchBoardFeedbacks } from '@/composables/board/feedbacks/fetch'

const { feedbacks, fetchBoardFeedbacks, loading: feedbackLoading } = useFetchBoardFeedbacks()
const { board, fetchUserBoardById, loading } = useFetchUserBoardById()

const id = useRoute().params.id as string

fetchBoardFeedbacks(id)
fetchUserBoardById(id)

const host = computed(() => {
	return location.host
})
const { copyData } = useCopyToClipboard()


const copyBoardLink = (id: string) => {
	copyData({ info: `${host.value}/b/${id}`, msg: 'Link copied to clipboard' })
}




const demo_feedback = [
	{ id: 'a1b2c3d4e', title: 'Google Calendar integration', desc: 'I would be willing to pay extra for a calendar integration', upvotes: 123 },
	{ id: 'f5g6h7i8j', title: 'Mobile App Enhancements', desc: 'The mobile app needs to be more responsive and user-friendly.', upvotes: 85 },
	{ id: 'k9l0m1n2o', title: 'Additional Language Support', desc: 'Please add support for more languages, especially Spanish and French.', upvotes: 78 }
]




definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
