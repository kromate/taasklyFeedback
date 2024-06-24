<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<header v-if="!loading" class="container flex items-start gap-2  py-4 md:px-0 px-4 bg-transparent">
				<Undo2 v-if="showBackBtn" class="border border-dark p-1 rounded-md cursor-pointer !min-w-[35px] !max-h-[35px] hover:btn_shadow transite " :size="35" @click="useRouter().push(`/b/${id}`)" />
				<div class="flex flex-col">
					<h1 class="text-3xl font-bold">
						{{ board.title }}
					</h1>
					<p class="text-base max-w-sm">
						{{ board.desc }}
					</p>
				</div>
			</header>
			<Skeleton v-else height="100px" />
			<slot />
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import { Undo2 } from 'lucide-vue-next'
import { useFetchUserBoardById } from '@/composables/board/id'
import { useCustomHead } from '@/composables/core/head'

const showBackBtn = computed(() => useRouter().currentRoute.value.name !== 'b-id')

const { board, fetchUserBoardById, loading } = useFetchUserBoardById()
const id = useRoute().params.id as string
await fetchUserBoardById(id)
if (board.value.title === undefined) {
	throw	createError({ statusCode: 404, statusMessage: 'Board not found' })
}

useCustomHead({
	title: `${board.value.title} | Feedback`,
	desc: board.value.desc,
	img: '/og.png'
})



</script>

<style scoped></style>
