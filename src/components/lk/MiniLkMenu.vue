<template lang="pug">
nav.border-t.border-surface-200.bg-surface-0
	.flex.justify-around.items-center.h-16.max-w-screen-md.mx-auto.pb-2
		router-link.flex.flex-col.items-center.justify-center.w-full.h-full.space-y-1.transition-transform.active_scale-95.cursor-pointer(
			v-for="item in menuItems" :key="item.path" :to="`/lk/${item.path}`"
			:class="['hover:opacity-60']"
		)
			span.text-xl.pi(
				:class="[item.icon, activeMenu === item.key ? 'text-primary' : 'text-surface-500']"
			)
			span.text-xs.font-medium(
				:class="activeMenu === item.key ? 'text-primary' : 'text-surface-500'"
			) {{ item.label }}
</template>

<script setup>
	import { ref } from 'vue';

	const activeMenu = ref('list');
	const menuItems = [
		{path: 'list',label: 'Список',icon: 'pi pi-list',},
		{path: 'add',label: 'Добавить',icon: 'pi pi-plus',},
		{path: 'profile',label: 'Профиль',icon: 'pi pi-user',},
	];
</script>

<style scoped>
.router-link-active {
	/* 'bg-surface-100 shadow-inner' */
	opacity: 0.5;
}
</style>