<template lang="pug">
//- кастомных кнопок-табов в стиле iOS Segmented Control
.flex.p-1.bg-surface-200.rounded-lg
	button.flex-1.py-1.text-sm.font-medium.rounded-md.transition-all.cursor-pointer(v-for="item in list" @click="tab = item.value"
		:class="tab === item.value ? 'bg-surface-0 text-surface-900 shadow-sm' : 'text-surface-600 hover:text-surface-900'") {{item.name}}
</template>

<script setup>
	defineProps({
		list: {
			type: Array,
			default: () => []
		}
	})

	const tab = defineModel({type:String})
</script>

<style scoped>

</style>