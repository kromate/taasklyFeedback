<template>
	<div class="w-full">
		<section v-if="!loading" class="flex flex-col w-full">
			<h1 class="text-lg font-semibold mb-4">
				{{ comments.length }} {{ comments.length === 1 ? 'Comment' : 'Comments' }}
			</h1>
			<div class="grid md:grid-cols-2 gap-4 w-full">
				<nuxt-link v-for="comment in comments" :key="comment.id" :to="`/dashboard/${comment.id}`" class="flex flex-col p-4 border border-dark w-full rounded shadow-md hover:btn_shadow">
					<h1 class="text-lg font-medium">
						{{ comment.title }}
					</h1>
					<p class="text-sm">
						{{ comment.desc }}
					</p>
				</nuxt-link>
			</div>
		</section>

		<div v-else class="flex flex-col w-full">
			<span class="text-xl font-bold mb-4">Loading board..</span>
			<Skeleton height="300px" radius="8px" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFetchFeadbackComments } from '@/composables/board/feedbacks/comments/fetch'


const { comments, fetchFeadbackComments, loading } = useFetchFeadbackComments()



</script>

<style scoped>
.disc{
	@apply text-sm font-normal flex gap-2 items-center p-1 px-3 bg-[#1d1b1b] rounded-lg text-white;
}
</style>
