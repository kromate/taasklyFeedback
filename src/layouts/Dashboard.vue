<template>
	<div class=" min-h-screen">
		<section class="flex flex-col">
			<HeroNav />
			<SubMenu />
			<slot />
		</section>


		<ModalBase />
		<Alert />
	</div>
</template>

<script setup lang="ts">
import HeroNav from '@/components/layouts/HeroNav.vue'
import SubMenu from '@/components/layouts/SubMenu.vue'

</script>

<style scoped></style>
