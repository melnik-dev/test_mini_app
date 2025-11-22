<template lang="pug">
.flex.items-center.justify-between.py-3.border-b.px-4(class="border-[var(--tg-theme-hint-color)]/20")
	span(class="text-[var(--tg-theme-text-color)]") {{label}}
	ToggleSwitch(v-model="model")
</template>

<script setup>
	import ToggleSwitch from 'primevue/toggleswitch';
	defineProps({label: String})
	const model = defineModel()
</script>


<style scoped>

</style>