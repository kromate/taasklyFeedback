<template>
	<div class="w-full">
		<section v-if="!loading" class="flex flex-col w-full">
			<h1 class="text-xl font-bold mb-4">
				{{ boards.length }} Board
			</h1>
			<div class="grid md:grid-cols-2 gap-4 w-full">
				<nuxt-link v-for="board in boards" :key="board.id" :to="`/dashboard/${board.id}`" class="flex flex-col p-4 border border-dark w-full rounded shadow-md hover:btn_shadow">
					<h1 class="text-lg font-medium">
						{{ board.title }}
					</h1>
					<p class="text-sm">
						{{ board.desc }}
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

const boards = ref([])
const loading = ref(false)
</script>

<style scoped>
.disc{
	@apply text-sm font-normal flex gap-2 items-center p-1 px-3 bg-[#1d1b1b] rounded-lg text-white;
}
</style>
