<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<DashboardNav />
			<SubMenu />
			<slot />
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import DashboardNav from '@/components/layouts/DashboardNav.vue'
import SubMenu from '@/components/layouts/SubMenu.vue'

</script>

<style scoped></style>
