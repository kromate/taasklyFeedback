<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<DashboardNav />
			<slot />
			<a href="https://feedback.taaskly.site/b/3154eb85-180b-4857-a74c-9b3307229325" target="_blank" class="px-4 py-1 text-sm rounded-full bg-dark text-light fixed bottom-7 right-7 hover:underline">
				Drop us a feedback
			</a>
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import DashboardNav from '@/components/layouts/DashboardNav.vue'

</script>

<style scoped></style>
