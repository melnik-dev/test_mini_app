<template lang="pug">
nav.border-t.border-surface-200.bg-surface-0
	.flex.justify-around.items-center.h-16.max-w-screen-md.mx-auto.px-2
		button.flex.flex-col.items-center.justify-center.w-full.h-full.space-y-1.transition-transform.active_scale-95.cursor-pointer(
			v-for="item in menuItems" :key="item.key" @click="activeMenu = item.key"
			:class="['hover:opacity-80', activeMenu === item.key ? 'bg-surface-100 shadow-inner' : '']"
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
		{key: 'list',label: 'Список',icon: 'pi pi-list',},
		{key: 'add',label: 'Добавить',icon: 'pi pi-plus',},
		{key: 'profile',label: 'Профиль',icon: 'pi pi-user',},
	];
</script>