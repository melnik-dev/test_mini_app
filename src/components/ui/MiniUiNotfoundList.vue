<template lang="pug">
div.flex.flex-col.items-center.justify-center.py-16.text-center
	.w-20.h-20.mb-4.rounded-full.bg-surface-200.flex.items-center.justify-center
		Bird.text-surface-500.is-animating(:size="40")
	h3.text-lg.font-semibold.text-surface-900 Ничего не найдено
	p.text-sm.text-surface-500.max-w-xs.mt-2(v-if="text") {{ text }}
	slot
</template>

<script setup>
	import { Bird } from 'lucide-vue-next';
	defineProps({
		text: {
			type: String,
			default: ''
		}
	})
</script>

<style scoped>
	/* Анимация птички */
	@keyframes flip-and-wait {
		0%, 37%, 100% { transform: rotateY(0); }
		8%, 29% { transform: rotateY(-180deg); }
	}
	.is-animating {
		animation: flip-and-wait 5s infinite ease-in-out;
	}
</style>