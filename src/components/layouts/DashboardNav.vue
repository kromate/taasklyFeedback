<template>
	<header class="container flex items-center justify-between py-4 md:px-5 px-4 bg-transparent">
		<nuxt-link to="/">
			<img src="/lt2.svg" alt="logo" class=" md:w-auto w-32">
		</nuxt-link>


		<button v-if="isLoggedIn" class="btn-primary" @click="useSignin().signOut()">
			logout
		</button>
		<nuxt-link v-else to="/auth/login" class="btn-primary">
			Login
		</nuxt-link>
	</header>
</template>

<script setup lang="ts">
import { useSignin } from '@/composables/auth/auth'
import { useUser } from '@/composables/auth/user'



const { isLoggedIn } = useUser()
</script>

<style scoped>
.btn-primary{
@apply text-sm px-5 py-3 md:text-base md:px-10
}
</style>
