<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<header v-if="!loading" class="container flex items-center justify-between max-w-[1100px] py-4 md:px-0 px-4 bg-transparent">
				<div class="flex flex-col">
					<h1 class="text-3xl font-bold">
						{{ board.title }}
					</h1>
					<p class="text-base ">
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
import { useFetchUserBoardById } from '@/composables/board/id'


const { board, fetchUserBoardById, loading } = useFetchUserBoardById()
const id = useRoute().params.id as string
fetchUserBoardById(id)

</script>

<style scoped></style>
