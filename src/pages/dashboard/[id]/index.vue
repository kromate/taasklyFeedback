<template>
	<main v-if="!loading" class=" md:h-[calc(100vh-170px)] h-full  px-5 container flex justify-center w-full">
		<div class="w-full flex flex-col md:flex-row gap-24 md:py-12 py-6 justify-center">
			<div class="flex flex-col gap-9 w-full max-w-md">
				<h1 class="flex flex-col md:flex-row items-start gap-4 w-full max-w-full">
					<Undo2 class="border border-dark p-1 rounded-md cursor-pointer !min-w-[32px] !max-h-[32px] hover:btn_shadow transite " :size="32" @click="useRouter().back()" />
					<div class="flex flex-col">
						<span class="text-3xl font-bold">{{ board.title }}</span>
						<span class="text-base ">{{ board.desc }}</span>
						<div class="field mt-4 items-start gap-4">
							<label for="link" class="text-lg">Public link</label>
							<div class="input-field w-full py-4 flex items-center justify-between gap-5">
								<div class="select-all  text-base w-full" @click="board.custom_link ? copyBoardLink(board.id, true): copyBoardLink(board.id, false)">
									{{ truncateString(`${host}/${board.custom_link ? 'c':'b'}/${board.custom_link ? board.custom_link : board.id }`, 20) }}
								</div>

								<div class="gap-2 flex">
									<Copy class="cursor-pointer border border-dark p-1 rounded" :size="28" @click="board.custom_link ? copyBoardLink(board.id, true): copyBoardLink(board.id, false)" />
									<a :href="`http://${host}/${board.custom_link ? 'c':'b'}/${board.custom_link ? board.custom_link : board.id}`" target="_blank"><MoveUpRight class="cursor-pointer border border-dark p-1 rounded" :size="28" /></a>
								</div>
							</div>

							<div class="field relative">
								<label for="email" class="w-full flex items-center justify-between">
									Custom link
									<button :disabled="disabled" class="text-sm btn  py-1 px-3" @click="is_editing ? updateCustomLink(id) : is_editing = true">{{ is_editing ? 'Update' : 'Edit' }}</button>

								</label>
								<input
									id="custom_link"
									v-model="custom_link"
									:disabled="!is_editing"
									placeholder="Custom board link"
									type="text"
									class="input-field"
									autocomplete="off"
									required
								>
								<Spinner v-if="editLoading" class="!border-t-dark !border-[#0c030366] absolute right-4 top-11" />
								<span v-if="!isCustomLinkAvailable && board.custom_link !== custom_link" class="text-rose-500 font-bold">This custom link is taken</span>
							</div>
							<button class="btn btn-primary w-full gap-2 mt-12" @click="setDeleteBoardId(board.id)">
								Delete
							</button>
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
			<Skeleton v-else height="500px" radius="8px" />
		</div>
	</main>
	<Skeleton v-else height="500px" />
</template>

<script setup lang="ts">
import { Copy, Undo2, MoveUpRight, PenLine } from 'lucide-vue-next'
import { truncateString } from '@/composables/utils/formatter'
import { useFetchUserDoashboardBoardById } from '@/composables/board/id'
import { useCopyToClipboard } from '@/composables/utils/share'
import { useFetchDashboardBoardFeedbacks } from '@/composables/board/feedbacks/fetch'
import { useDeleteBoard } from '@/composables/board/delete'
import { useEditBoard } from '@/composables/board/edit'




const { updateCustomLink, loading: editLoading, custom_link, is_editing, isCustomLinkAvailable } = useEditBoard()
const { setDeleteBoardId } = useDeleteBoard()


const disabled = computed(() => {
	if (custom_link.value === board.value.custom_link) {
		return false
	}
	if (is_editing.value) {
		return !isCustomLinkAvailable.value || editLoading.value
	} else {
		return false
	}
})

const { feedbacks, fetchBoardFeedbacks, loading: feedbackLoading } = useFetchDashboardBoardFeedbacks()
const { board, fetchUserBoardById, loading } = useFetchUserDoashboardBoardById()

const id = useRoute().params.id as string

fetchBoardFeedbacks(id)
fetchUserBoardById(id)

onMounted(async () => {
	fetchBoardFeedbacks(id)
	await fetchUserBoardById(id)
	if (board.value.custom_link) {
		custom_link.value = board.value.custom_link
	}
})

const host = computed(() => {
	return location.host
})
const { copyData } = useCopyToClipboard()


const copyBoardLink = (id: string, isCustom: boolean) => {
	if (isCustom) {
		copyData({ info: `${host.value}/c/${id}`, msg: 'Link copied to clipboard' })
	} else {
		copyData({ info: `${host.value}/b/${id}`, msg: 'Link copied to clipboard' })
	}
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
