<template>
	<form class="flex flex-col gap-5 bg-light p-7 rounded-md border border-dark w-full max-w-sm" @submit.prevent="create">
		<h2 class="font-bold text-2xl mb-8">
			Create a feedback board
		</h2>
		<div class="field">
			<label for="email">Board Title</label>
			<input
				id="title"
				v-model="createBoardForm.title.value"
				placeholder="Enter a Board title"
				type="text"
				class="input-field"
				autocomplete="off"
				required
			>
		</div>
		<div class="field">
			<label for="email">Board description</label>
			<textarea
				id="desc"
				v-model="createBoardForm.desc.value"
				placeholder="Enter a Board description (Optional)"
				type="text"
				class="input-textarea resize-none"
				autocomplete="off"
				rows="3"
			/>
		</div>
		<button class="btn-primary" :disabled="loading" type="submit">
			<Spinner v-if="loading" />
			<span v-else>Create Board</span>
		</button>
	</form>
</template>

<script setup lang="ts">

import { useCreateBoard } from '@/composables/board/create'



const { create, createBoardForm, loading } = useCreateBoard()
</script>

<style scoped>

</style>
