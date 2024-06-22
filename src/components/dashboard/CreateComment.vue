<template>
	<form class="flex flex-col w-full gap-4" @submit.prevent="create(board_id, id)">
		<div class="field w-full">
			<textarea
				id="desc"
				v-model="createCommentForm.comment.value"
				placeholder="Leave a comment"
				type="text"
				class="input-textarea py-2"
				autocomplete="off"
				rows="1"

			/>
		</div>
		<Transition appear name="scale">
			<button v-if="createCommentForm.comment.value" class="btn-primary transite" :disabled="loading" type="submit">
				<Spinner v-if="loading" />
				<span v-else>Submit Comment</span>
			</button>
		</Transition>
	</form>
</template>

<script setup lang="ts">


import { useCreateComment } from '@/composables/board/feedbacks/comments/create'



const id = useRoute().params.pid as string
const board_id = useRoute().params.id as string

const { create, createCommentForm, loading } = useCreateComment()
</script>

<style scoped>

</style>
