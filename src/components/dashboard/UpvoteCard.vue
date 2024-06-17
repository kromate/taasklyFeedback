<template>
	<article class="flex gap-2 items-center justify-between border-[1.5px] border-dark bg-light p-4 rounded-md w-full hover:shadow-none transite cursor-pointer btn_shadow">
		<div class="flex flex-col gap-2">
			<h1 class="font-semibold text-xl">
				{{ data.title }}
			</h1>
			<p>
				{{ data.description }}
			</p>
		</div>
		<div class="flex flex-col items-center justify-center border border-dark rounded-[4.5px] py-1 min-w-[50px]">
			<ChevronUp />
			<p class="text-dark">
				{{ data.upvotes }}
			</p>
		</div>
	</article>
</template>

<script setup lang="ts">
import { ChevronUp } from 'lucide-vue-next'

type feedbackType = {
    title: string
    description: string
    upvotes: number
    id: string
}
defineProps<{
    data: feedbackType
}>()


</script>

<style scoped>

</style>
