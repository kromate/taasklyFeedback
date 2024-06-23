<template>
	<main class=" h-full container grid md:grid-cols-2 gap-12 items-center  md:py-32 py-10">
		<section class="text-start px-4">
			<h1 class="md:text-7xl text-5xl font-extrabold mb-4 pathway leading-[1.2]">
				Feedback Simplified
			</h1>
			<p class="md:text-2xl text-lg font-medium md:font-normal text-dark mb-8 ">
				Seamlessly collect, analyze, and act on customer feedback to enhance your products and services. Boost satisfaction, loyalty, and performance with our intuitive feedback solution.
			</p>
			<nuxt-link to="/dashboard" class="bg-black text-white md:py-4 py-3 md:px-10 px-8 rounded-md mb-4 md:text-xl">
				Collect Feedback
			</nuxt-link>
		</section>

		<section class="flex center items-start h-full">
			<div class="flex flex-col max-w-lg w-full gap-4 max-h-[410px] overflow-auto hide-scrollbar px-4 md:p-5 ">
				<DashboardUpvoteCard v-for="sample in demo_feedback" :key="sample.id" :data="sample" />
			</div>
		</section>
	</main>
</template>

<script lang='ts' setup>

const demo_feedback = [
	{ id: 'a1b2c3d4e', title: 'Google Calendar integration', desc: 'I would be willing to pay extra for a calendar integration', upvotes: 123 },
	{ id: 'f5g6h7i8j', title: 'Mobile App Enhancements', desc: 'The mobile app needs to be more responsive and user-friendly.', upvotes: 85 },
	{ id: 'k9l0m1n2o', title: 'Additional Language Support', desc: 'Please add support for more languages, especially Spanish and French.', upvotes: 78 },
	{ id: 'p3q4r5s6t', title: 'Dark Mode', desc: 'A dark mode option would be really helpful for working at night.', upvotes: 65 },
	{ id: 'u7v8w9x0y', title: 'Customizable Notifications', desc: 'Allow users to customize the type and frequency of notifications they receive.', upvotes: 53 },
	{ id: 'z1a2b3c4d', title: 'Integration with Slack', desc: 'Integration with Slack for team collaboration would be fantastic.', upvotes: 49 },
	{ id: 'e5f6g7h8i', title: 'Improved Analytics', desc: 'Provide more detailed analytics and reporting features.', upvotes: 42 },
	{ id: 'j9k0l1m2n', title: 'User Tutorials', desc: 'Add more tutorials and guides to help new users get started.', upvotes: 38 },
	{ id: 'o3p4q5r6s', title: 'Enhanced Security', desc: 'Focus on improving security features to protect user data.', upvotes: 34 },
	{ id: 't7u8v9w0x', title: 'Performance Optimization', desc: 'Optimize performance to ensure smooth and fast user experience.', upvotes: 29 },
	{ id: 'y1z2a3b4c', title: 'Customizable Dashboards', desc: 'Allow users to customize their dashboards with widgets they find useful.', upvotes: 27 },
	{ id: 'd5e6f7g8h', title: 'Integration with Microsoft Teams', desc: 'Integration with Microsoft Teams would be very beneficial.', upvotes: 25 },
	{ id: 'i9j0k1l2m', title: 'Export Data', desc: 'Provide options to export data in various formats for offline analysis.', upvotes: 22 },
	{ id: 'n3o4p5q6r', title: '24/7 Customer Support', desc: 'Offer 24/7 customer support for users in different time zones.', upvotes: 18 },
	{ id: 's7t8u9v0w', title: 'API Access', desc: 'Provide API access for developers to create custom integrations.', upvotes: 15 },
	{ id: 'x1y2z3a4b', title: 'Social Media Sharing', desc: 'Allow users to share feedback results directly on social media.', upvotes: 13 },
	{ id: 'c5d6e7f8g', title: 'In-App Chat Support', desc: 'Add an in-app chat support feature for real-time assistance.', upvotes: 10 },
	{ id: 'h9i0j1k2l', title: 'Multiple User Roles', desc: 'Support for multiple user roles and permissions.', upvotes: 9 },
	{ id: 'm3n4o5p6q', title: 'Advanced Search', desc: 'Improve search functionality with advanced filtering options.', upvotes: 7 },
	{ id: 'r7s8t9u0v', title: 'Automated Reports', desc: 'Set up automated reports to be sent to email at regular intervals.', upvotes: 5 }
]
</script>
