<template lang="pug">
.flex.flex-col.h-screen
	// Основной контент
	.flex-1.w-full.max-w-screen-md.mx-auto.overflow-y-auto
		router-view
	MiniLkMenu
</template>

<script setup>
	import MiniLkMenu from "@/components/lk/MiniLkMenu.vue";
</script>