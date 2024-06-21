<template>
	<header class="container flex items-center justify-between py-4 md:px-5 px-4 bg-transparent">
		<nuxt-link to="/">
			<img src="/lt2.svg" alt="logo" class=" md:w-auto w-32">
		</nuxt-link>


		<!-- <button  class="btn-primary" @click="useSignin().signOut()">
			logout
		</button> -->
		<AvatarDropdown v-if="isLoggedIn" />
		<nuxt-link v-else to="/auth/login" class="btn-primary">
			Login
		</nuxt-link>
	</header>
</template>

<script setup lang="ts">

import { useUser } from '@/composables/auth/user'
import AvatarDropdown from '@/components/core/AvatarDropdown.vue'



const { isLoggedIn } = useUser()
</script>

<style scoped>
.btn-primary{
@apply text-sm px-5 py-3 md:text-base md:px-10
}
</style>
