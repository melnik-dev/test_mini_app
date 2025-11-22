<template lang="pug">
.p-4.pb-32.space-y-3
	//- Список товаров
	//- Контейнер загрузки
	Transition(name="fade" mode="out-in")
		div(v-if="loading" key="loader" class="flex flex-col items-center justify-center py-10")
			Loader2(
				class="animate-spin text-[var(--tg-theme-button-color)]"
				:size="40"
			)
		div.space-y-3(v-else-if="!loading&&list.length" key="list")
			TransitionGroup(name="list" tag="div" class="space-y-3")
				MiniLkProductItem(
					v-for="product in list"
					:key="product.id"
					:product="product"
					:selected="selectedItems.has(product.id)"
					:show-price-change="true"
					@update:selected="$_mini_lk_product_list_toggleSelection"
					@delete="$_mini_lk_product_list_deleteItem"
				)
		//- Пустое состояние
		MiniUiNotfoundList(v-else text="Список отслеживания пуст. Добавьте первый товар!" key="empty")
			//- Кнопка добавления для пустого экрана
			Button.mt-6(label="Добавить товар" icon="pi pi-plus" rounded @click="")
//- Появляется только если выбраны элементы
Transition(name="slide-up")
	MiniUiFloatingActionBar(v-if="selectedItems.size > 0" :count="selectedItems.size"
		@cansel="selectedItems.clear()" @delete="$_mini_lk_product_list_confirmDeleteGroup")
</template>
<script setup>
import {onMounted, ref} from 'vue';
	import { useConfirm } from "primevue/useconfirm";
	import { useToast } from "primevue/usetoast";
	import { Button } from 'primevue';
	import MiniLkProductItem from '@/components/lk/product/MiniLkProductItem.vue';
	import MiniUiNotfoundList from "@/components/ui/MiniUiNotfoundList.vue";
	import MiniUiFloatingActionBar from "@/components/ui/MiniUiFloatingActionBar.vue";
	import { Loader2 } from 'lucide-vue-next';

	const loading = ref(true);

	// Mock Data
	const list = ref([
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

	// Services
	const confirm = useConfirm();
	const toast = useToast();

	const selectedItems = ref(new Set());

	// Logic
	function $_mini_lk_product_list_toggleSelection(productId) {
		const newSet = new Set(selectedItems.value);
		if (newSet.has(productId)) {
			newSet.delete(productId);
		} else {
			newSet.add(productId);
		}
		selectedItems.value = newSet;
	}

	async function $_mini_lk_product_list_deleteItem(targetId) {
		const res = false // запрос
		if (res) {
			list.value = list.value.filter(p => p.id !== targetId);
			selectedItems.value.delete(targetId); // Убираем из выделения если был
			toast.add({ severity: 'success', summary: 'Удалено', detail: 'Товар удален', life: 3000 });
		} else toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при удалении товара', life: 3000 });
	}
	function $_mini_lk_product_list_confirmDeleteItem(targetId) {
		list.value = list.value.filter(p => p.id !== targetId);
		selectedItems.value.delete(targetId); // Убираем из выделения если был
		toast.add({ severity: 'success', summary: 'Удалено', detail: 'Товар удален', life: 3000 });
	}
	function $_mini_lk_product_list_confirmDeleteGroup() {
		confirm.require({
			message: `Вы уверены, что хотите удалить ${selectedItems.value.size} выбранных товаров?`,
			header: 'Подтверждение',
			icon: 'pi pi-exclamation-triangle',
			rejectProps: {label: 'Отмена',severity: 'secondary',outlined: true},
			acceptProps: {label: 'Удалить',severity: 'danger'},
			accept: $_mini_lk_product_list_deleteGroup
		});
	}
	async function $_mini_lk_product_list_deleteGroup() {
		const res = await new Promise((resolve)=> {
			setTimeout(()=> {
				resolve('ok')
			}, 2000)
		}) // запрос
		if (res) {
			toast.add({ severity: 'success', summary: 'Удалено', detail: `${selectedItems.value.size} товаров удалено`, life: 3000 });
			list.value = list.value.filter(p => !selectedItems.value.has(p.id));
			selectedItems.value.clear();
		} else toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при удалении товаров', life: 3000 });
	}

	onMounted(()=>{
		setTimeout(()=>{
			loading.value = false
		}, 2000)
	})
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
