<template>
	<div class="w-full">
		<section v-if="!loading" class="flex flex-col w-full">
			<h1 class="text-xl font-bold mb-4">
				{{ boards.length }} Board
			</h1>
			<div class="grid md:grid-cols-2 gap-4 w-full">
				<article v-for="board in boards" :key="board.id" class="flex flex-col p-4 border border-dark w-full rounded shadow-md hover:btn_shadow cursor-pointer" @click="useRouter().push(`/dashboard/${board.id}`)">
					<h1 class="text-lg font-medium">
						{{ board.title }}
					</h1>
					<p class="text-sm">
						{{ board.desc }}
					</p>
					<button class="select-all  text-sm italic w-full underline mt-auto text-start" @click.stop="board.custom_link ? copyBoardLink(board.id, true): copyBoardLink(board.id, false)">
						<span class="mt-4">
							{{ truncateString(`${host}/${board.custom_link ? 'c':'b'}/${board.custom_link ? board.custom_link : board.id }`, 30) }}
						</span>
					</button>
				</article>
			</div>
		</section>

		<div v-else class="flex flex-col w-full">
			<span class="text-xl font-bold mb-4">Loading board..</span>
			<Skeleton height="300px" radius="8px" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { truncateString } from '@/composables/utils/formatter'
import { useCopyToClipboard } from '@/composables/utils/share'

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

defineProps({
	boards: {
		type: Array as PropType<Board[]>,
		required: true
	},
	loading: {
		type: Boolean,
		required: true
	}
})
type Board = {
	id: string
	title: string
	desc: string
	custom_link: string
}

</script>

<style scoped>
.disc{
	@apply text-sm font-normal flex gap-2 items-center p-1 px-3 bg-[#1d1b1b] rounded-lg text-white;
}
</style>
