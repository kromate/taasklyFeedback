<template>
	<section class="flex items-center justify-center px-4 bg-transparent border-y border-line ">
		<nuxt-link to="/dashboard" class="link-item">
			Home
		</nuxt-link>
		<nuxt-link v-if="isLoggedIn" to="/dashboard/customisation" class="link-item">
			Customisation
		</nuxt-link>
	</section>
</template>

<script setup lang="ts">
import { useUser } from '@/composables/auth/user'


const { isLoggedIn } = useUser()
</script>

<style scoped lang='scss'>
.link-item{
	@apply px-4 py-3 text-sm hover:bg-hover;
}
.link-item.router-link-active {
	box-shadow: inset 0 -3px 0 var(--dark);
    @apply font-bold;
}
</style>
