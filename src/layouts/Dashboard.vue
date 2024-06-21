<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<DashboardNav />
			<slot />
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import DashboardNav from '@/components/layouts/DashboardNav.vue'

</script>

<style scoped></style>
