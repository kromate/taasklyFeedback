<template>
	{{ useIP().ip }}
	<PagesHero />
</template>

<script setup lang="ts">
import { useIP } from '@/composables/core/ip'

</script>

<style scoped>

</style>
