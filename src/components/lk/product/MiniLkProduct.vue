<template lang="pug">
//- Обертка приложения
.min-h-screen.bg-surface-50.safe-area-top.safe-area-bottom.transition-colors.duration-300
	//- Шапка
	header.sticky.top-0.z-50.backdrop-blur-md.border-b.border-surface-200.safe-area-top(
		class="bg-surface-0/80 supports-[backdrop-filter]:bg-surface-0/60"
	)
		.px-4.py-3.space-y-3
			.flex.items-center.justify-end
				//- Пример кнопки настроек или фильтра в хедере
				Button(icon="pi pi-filter" text rounded severity="secondary" aria-label="Filter")
			MiniUiTabButton(v-model="currentTab" :list="tabList")
	//- Основной контент
	MiniLkProductList(v-if="currentTab === 'all'")
	MiniLkProductGroup(v-if="currentTab === 'group'")
</template>

<script setup>
	import { ref } from 'vue';
	import { Button } from 'primevue';
	import MiniUiTabButton from '@/components/ui/MiniUiTabButton.vue'
	import MiniLkProductList from "@/components/lk/product/MiniLkProductList.vue";
	import MiniLkProductGroup from "@/components/lk/product/MiniLkProductGroup.vue";

	const currentTab = ref('all'); // 'all' | 'group'
	const tabList = [{value: 'all', name: 'Все товары'},{value: 'group', name: 'Группы товаров'}]
</script>

<style scoped>

</style>