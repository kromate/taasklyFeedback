<template>
	<main class="w-full md:h-[calc(100vh-170px)] h-[calc(100vh-160px)]  px-5 ">
		<div class="container flex gap-20 py-12 ">
			<DashboardCreateBoard />
			<DashboardUpvoteCard v-for="sample in demo_feedback" :key="sample.id" :data="sample" />
		</div>
	</main>
</template>

<script setup lang="ts">



const demo_feedback = [
	{ id: 'a1b2c3d4e', title: 'Google Calendar integration', description: 'I would be willing to pay extra for a calendar integration', upvotes: 123 },
	{ id: 'f5g6h7i8j', title: 'Mobile App Enhancements', description: 'The mobile app needs to be more responsive and user-friendly.', upvotes: 85 },
	{ id: 'k9l0m1n2o', title: 'Additional Language Support', description: 'Please add support for more languages, especially Spanish and French.', upvotes: 78 }

]



definePageMeta({
	layout: 'dashboard',
	middleware: 'is-authenticated'
})
</script>

<style scoped>

</style>
