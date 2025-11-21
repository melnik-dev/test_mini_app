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
			MiniTabButton(v-model="currentTab" :list="tabList")
	//- Основной контент
	.p-4.pb-32.space-y-3
		//- Список товаров
		TransitionGroup(name="list" tag="div" class="space-y-3")
			MiniLkListItem(
				v-for="product in filteredProducts"
				:key="product.id"
				:product="product"
				:selected="selectedItems.has(product.id)"
				:show-price-change="currentTab === 'group'"
				@update:selected="$_mini_lk_list_toggleSelection"
				@delete="$_mini_lk_list_confirmDelete('single', product.id)"
			)

		//- Пустое состояние (Empty State)
		MiniUiNotfoundList(v-if="filteredProducts.length === 0" text="Список отслеживания пуст. Добавьте первый товар!")
			//- Кнопка добавления для пустого экрана
			Button.mt-6(label="Добавить товар" icon="pi pi-plus" rounded @click="$emit('add')")

	//- Плавающая панель действий (Floating Action Bar)
	//- Появляется только если выбраны элементы
	Transition(name="slide-up")
		div(v-if="selectedItems.size > 0").fixed.bottom-20.left-4.right-4.z-40
			.bg-surface-900.text-surface-0.p-3.rounded-xl.shadow-xl.flex.items-center.justify-between(
				class="dark:bg-surface-800"
			)
				span.font-medium.ml-2 Выбрано: {{ selectedItems.size }}
				.flex.gap-2
					Button(
						label="Отмена"
						text
						size="small"
						class="!text-surface-300 hover:!text-white"
						@click="selectedItems.clear()"
					)
					Button(
						label="Удалить"
						icon="pi pi-trash"
						severity="danger"
						size="small"
						@click="$_mini_lk_list_confirmDelete('group')"
					)
</template>
<script setup>
	import { ref, computed } from 'vue';
	import { useConfirm } from "primevue/useconfirm";
	import { useToast } from "primevue/usetoast";
	import { Button } from 'primevue';
	import MiniLkListItem from '@/components/lk/list/MiniLkListItem.vue';
	import MiniTabButton from '@/components/ui/MiniTabButton.vue'
	import MiniUiNotfoundList from "@/components/ui/MiniUiNotfoundList.vue";
	// Services
	const confirm = useConfirm();
	const toast = useToast();
	// State
	const currentTab = ref('all'); // 'all' | 'group'
	const tabList = [{value: 'all', name: 'Все товары'},{value: 'group', name: 'Группы товаров'}]
	const selectedItems = ref(new Set());
	// Mock Data
	const products = ref([
		{
			id: 1,
			title: 'iPhone 15 Pro Max',
			articleNumber: '123456789',
			initialPrice: 1199.99,
			currentPrice: 1099.99,
			imageUrl: '',
			lastChanged: new Date('2025-11-15'),
			priceChange: 'decrease'
		},
		{
			id: 2,
			title: 'MacBook Air M3',
			articleNumber: '987654321',
			initialPrice: 1299.99,
			currentPrice: 1399.99,
			imageUrl: 'https://placehold.co/60x40',
			lastChanged: new Date('2025-11-14'),
			priceChange: 'increase'
		},
		{
			id: 3,
			title: 'AirPods Pro 2nd Gen',
			articleNumber: '456789123',
			initialPrice: 249.99,
			currentPrice: 199.99,
			imageUrl: 'https://placehold.co/60x40',
			lastChanged: new Date('2025-11-13'),
			priceChange: 'decrease'
		}
	]);

	// Computed
	const filteredProducts = computed(() => {
		if (currentTab.value === 'group') {
			const weekAgo = new Date();
			weekAgo.setDate(weekAgo.getDate() - 7);
			return products.value.filter(p => new Date(p.lastChanged) >= weekAgo);
		}
		return products.value;
	});

	// Logic
	function $_mini_lk_list_toggleSelection(productId) {
		const newSet = new Set(selectedItems.value);
		if (newSet.has(productId)) {
			newSet.delete(productId);
		} else {
			newSet.add(productId);
		}
		selectedItems.value = newSet;
	}

	// Универсальная функция удаления
	function $_mini_lk_list_confirmDelete(type = 'single', targetId = null) {
		const count = type === 'group' ? selectedItems.value.size : 1;

		confirm.require({
			message: type === 'single'
				? 'Вы уверены, что хотите удалить этот товар?'
				: `Вы уверены, что хотите удалить ${count} выбранных товаров?`,
			header: 'Подтверждение',
			icon: 'pi pi-exclamation-triangle',
			rejectProps: {label: 'Отмена',severity: 'secondary',outlined: true},
			acceptProps: {label: 'Удалить',severity: 'danger'},
			accept: () => {
				if (type === 'single' && targetId) {
					products.value = products.value.filter(p => p.id !== targetId);
					selectedItems.value.delete(targetId); // Убираем из выделения если был
					toast.add({ severity: 'success', summary: 'Удалено', detail: 'Товар удален', life: 3000 });
				} else if (type === 'group') {
					products.value = products.value.filter(p => !selectedItems.value.has(p.id));
					selectedItems.value.clear();
					toast.add({ severity: 'success', summary: 'Удалено', detail: `${count} товаров удалено`, life: 3000 });
				}
			}
		});
	}
</script>

<style scoped>
	/* Анимация списка */
	.list-move,
	.list-enter-active,
	.list-leave-active {
		transition: all 0.3s ease;
	}
	.list-enter-from,
	.list-leave-to {
		opacity: 0;
		transform: translateY(10px);
	}
	.list-leave-active {
		position: absolute; /* для плавного схлопывания при удалении */
		width: 100%; /* чтобы не ломалась ширина при абсолюте */
	}

	/* Анимация панели снизу */
	.slide-up-enter-active,
	.slide-up-leave-active {
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.slide-up-enter-from,
	.slide-up-leave-to {
		transform: translateY(100%);
		opacity: 0;
	}
</style>
