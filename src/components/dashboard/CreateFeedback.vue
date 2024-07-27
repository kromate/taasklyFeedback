<template>
	<form class="flex flex-col gap-5 bg-light p-7 rounded-md border border-dark w-full max-w-sm" @submit.prevent="create(board)">
		<h2 class="font-bold text-2xl mb-8">
			Let's hear your feedback
		</h2>
		<div class="field">
			<label for="email">Short, descriptive title</label>
			<input
				id="title"
				v-model="createFeedbackForm.title.value"
				placeholder="Additional Language Support"
				type="text"
				class="input-field"
				autocomplete="off"
				required
			>
		</div>
		<div class="field">
			<label for="email">Description</label>
			<textarea
				id="desc"
				v-model="createFeedbackForm.desc.value"
				placeholder="Please add support for more languages, especially Spanish and French."
				type="text"
				class="input-textarea resize-none"
				autocomplete="off"
				rows="3"
			/>
		</div>
		<button class="btn-primary" :disabled="loading" type="submit">
			<Spinner v-if="loading" />
			<span v-else>Submit Feedback</span>
		</button>
	</form>
</template>

<script setup lang="ts">
import { useCreateFeedback } from '@/composables/board/feedbacks/create'



defineProps({
	board: {
		required: true,
		type: Object
	}
})

const { create, createFeedbackForm, loading } = useCreateFeedback()
</script>

<style scoped>

</style>
