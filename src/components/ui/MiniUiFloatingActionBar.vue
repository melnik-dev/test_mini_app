<template lang="pug">
//- Плавающая панель действий
.fixed.bottom-20.left-4.right-4.z-40
	.bg-surface-900.text-surface-0.p-3.rounded-xl.shadow-xl.flex.items-center.justify-between(
		class="dark:bg-surface-800"
	)
		span.font-medium.ml-2 Выбрано: {{ count }}
		.flex.gap-2
			Button(
				label="Отмена"
				text
				size="small"
				class="!text-surface-300 hover:!text-white"
				@click="$emit('cansel')"
			)
			Button(
				label="Удалить"
				icon="pi pi-trash"
				severity="danger"
				size="small"
				@click="$emit('delete')"
				)
</template>

<script setup>
	import { Button } from 'primevue';
	defineProps({
		count: {
			type: Number,
			default: 1
		}
	})
	defineEmits(['cansel', 'delete'])
</script>

<style scoped>

</style>