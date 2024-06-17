<template>
	<div>
		bhvghv
		<button @click="signOut">
			log out
		</button>
	</div>
</template>

<script setup lang="ts">
import { useSignin } from '@/composables/auth/auth'



const { signOut } = useSignin()

definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
