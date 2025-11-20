<script setup>
import { ref } from 'vue';
import { List, PlusCircle, User } from 'lucide-vue-next';

const activeTab = ref('list');
</script>

<template lang="pug">

.flex-1.w-full.max-w-screen-md.mx-auto
	router-view
nav.border-t.border-slate-200.bg-white(
	class="dark:bg-dark-ground dark:border-dark"
)
	.flex.justify-around.items-center.h-16.max-w-screen-md.mx-auto.px-2

		// --- Пункт 1: Список ---
		button.flex.flex-col.items-center.justify-center.w-full.h-full.space-y-1.transition-transform.active_scale-95(
			@click="activeTab = 'list'"
			class="hover:opacity-80"
		)
			List(
				:size="24"
				:class="activeTab === 'list' ? 'text-primary-500 dark:text-primary-400' : 'text-surface-400 dark:text-surface-600'"
			)
			span.text-xs.font-medium(
				:class="activeTab === 'list' ? 'text-primary-500 dark:text-primary-400' : 'text-surface-400 dark:text-surface-600'"
			) Список

		// --- Пункт 2: Добавить ---
		button.flex.flex-col.items-center.justify-center.w-full.h-full.space-y-1.transition-transform.active_scale-95(
			@click="activeTab = 'add'"
		)
			// Акцентная кнопка всегда primary
			PlusCircle(
				:size="28"
				class="text-primary-500 dark:text-primary-400"
			)
			span.text-xs.font-medium(
				class="text-primary-500 dark:text-primary-400"
			) Добавить

		// --- Пункт 3: Профиль ---
		button.flex.flex-col.items-center.justify-center.w-full.h-full.space-y-1.transition-transform.active_scale-95(
			@click="activeTab = 'profile'"
			class="hover:opacity-80"
		)
			User(
				:size="24"
				:class="activeTab === 'profile' ? 'text-primary-500 dark:text-primary-400' : 'text-surface-400 dark:text-surface-600'"
			)
			span.text-xs.font-medium(
				:class="activeTab === 'profile' ? 'text-primary-500 dark:text-primary-400' : 'text-surface-400 dark:text-surface-600'"
			) Профиль
</template>

<style>
</style>
