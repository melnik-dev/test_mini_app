<template lang="pug">
//- Обертка приложения
.bg-surface-50.safe-area-top.safe-area-bottom(class="dark:bg-surface-950 transition-colors duration-300")

	//- Шапка
	header.sticky.top-0.z-50.backdrop-blur.border-b.border-surface-200.safe-area-top(
		class="bg-surface-0/80 dark:bg-surface-900/80 dark:border-surface-800 supports-[backdrop-filter]:bg-surface-0/60"
	)
		.px-4.py-4
			//- Текст наследуется, но для заголовка задаем явно для контраста
			h1.text-2xl.font-bold.text-surface-900.text-balance(class="dark:text-surface-0")
				| {{ currentTab === 'all' ? 'Все товары' : 'Недавно измененные' }}

			//- Навигация
			.mt-3
				TabNavigation(
					:active-tab="currentTab"
					@tab-change="handleTabChange"
				)

	//- Основной контент
	main.flex-1.p-4.pb-24
		.space-y-3
			//- Карточки товаров
			ProductCard(
				v-for="product in filteredProducts",
				:key="product.id",
				:product="product",
				:selected="selectedItems.has(product.id)",
				:show-price-change="currentTab === 'recent'",
				@toggle-select="toggleSelection",
				@delete="showDeleteModal",
				@copy="copyArticleNumber"
			)

		//- Пустое состояние
		div(v-if="filteredProducts.length === 0").text-center.py-12.px-4
			.text-surface-500(class="dark:text-surface-400")
				//- Кружок под иконку
				.w-16.h-16.mx-auto.mb-4.rounded-full.flex.items-center.justify-center.bg-surface-100(
					class="dark:bg-surface-800"
				)
					Bird.w-8.h-8.is-animating

				p.text-lg.font-medium.text-balance.text-surface-900(class="dark:text-surface-50") Ничего не найдено
				p.text-sm.mt-1.text-pretty
					| {{ currentTab === 'recent' ? 'За последние 7 дней цен не менялось.' : 'Добавьте свой первый товар, чтобы начать отслеживать цены' }}

	//- Кнопка группового удаления (Красный цвет оставляем как семантический Error/Danger)
	Transition(name="slide-up")
		div(v-if="selectedItems.size > 0").fixed.bottom-4.left-4.right-4.z-40.safe-area-bottom
			button(
				@click="showGroupDeleteModal"
				class="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium shadow-lg hover:bg-red-600 active:scale-95 transition-all touch-manipulation dark:bg-red-600 dark:hover:bg-red-700"
			)
				| Удалить выбранные ({{ selectedItems.size }})

	//- Плавающая кнопка добавления (Используем primary цвет из конфига)
	Transition(name="fade")
		button(
			v-if="selectedItems.size === 0"
			@click="showAddModal = true"
			class="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all hover:scale-105 z-40 safe-area-bottom touch-manipulation flex items-center justify-center bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
		)
			PlusIcon.w-6.h-6

	//- Модальные окна
	Transition(name="fade")
		AddItemModal(
			:show="showAddModal"
			@close="showAddModal = false"
			@add="addProduct"
		)

	Transition(name="fade")
		DeleteModal(
			:show="deleteModal.show"
			:type="deleteModal.type"
			:count="deleteModal.count"
			@confirm="confirmDelete"
			@cancel="deleteModal.show = false"
		)
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
// import TabNavigation from '@/components/TabNavigation.vue'
// import ProductCard from '@/components/ProductCard.vue'
// import AddItemModal from '@/components/AddItemModal.vue'
// import DeleteModal from '@/components/DeleteModal.vue'
import { PlusIcon, Bird } from 'lucide-vue-next'

// State
const currentTab = ref('all')
const selectedItems = ref(new Set())
const showAddModal = ref(false)
const deleteModal = reactive({
	show: false,
	type: 'single', // 'single' or 'group'
	itemId: null,
	count: 0
})

// Sample data
const products = ref([
	{
		id: 1,
		title: 'iPhone 15 Pro Max',
		articleNumber: '123456789',
		initialPrice: 1199.99,
		currentPrice: 1099.99,
		imageUrl: '/placeholder.svg?height=60&width=60',
		lastChanged: new Date('2024-01-15'),
		priceChange: 'decrease'
	},
	{
		id: 2,
		title: 'MacBook Air M3',
		articleNumber: '987654321',
		initialPrice: 1299.99,
		currentPrice: 1399.99,
		imageUrl: '/placeholder.svg?height=60&width=60',
		lastChanged: new Date('2024-01-14'),
		priceChange: 'increase'
	},
	{
		id: 3,
		title: 'AirPods Pro 2nd Gen',
		articleNumber: '456789123',
		initialPrice: 249.99,
		currentPrice: 199.99,
		imageUrl: '/placeholder.svg?height=60&width=60',
		lastChanged: new Date('2024-01-13'),
		priceChange: 'decrease'
	}
])

// Computed
const filteredProducts = computed(() => {
	if (currentTab.value === 'recent') {
		return products.value.filter(product =>
			product.lastChanged >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
		)
	}
	return products.value
})

// Methods
const toggleSelection = (productId) => {
	if (selectedItems.value.has(productId)) {
		selectedItems.value.delete(productId)
	} else {
		selectedItems.value.add(productId)
	}
}

const showDeleteModal = (productId) => {
	deleteModal.show = true
	deleteModal.type = 'single'
	deleteModal.itemId = productId
	deleteModal.count = 1
}

const showGroupDeleteModal = () => {
	deleteModal.show = true
	deleteModal.type = 'group'
	deleteModal.count = selectedItems.value.size
}

const confirmDelete = () => {
	if (deleteModal.type === 'single') {
		products.value = products.value.filter(p => p.id !== deleteModal.itemId)
	} else {
		products.value = products.value.filter(p => !selectedItems.value.has(p.id))
		selectedItems.value.clear()
	}
	deleteModal.show = false
}

const copyArticleNumber = (articleNumber) => {
	navigator.clipboard.writeText(articleNumber)
}

const addProduct = (articleNumber) => {
	const newProduct = {
		id: Date.now(),
		title: `Product ${articleNumber}`,
		articleNumber,
		initialPrice: Math.floor(Math.random() * 1000) + 100,
		currentPrice: Math.floor(Math.random() * 1000) + 100,
		imageUrl: '/placeholder.svg?height=60&width=60',
		lastChanged: new Date(),
		priceChange: Math.random() > 0.5 ? 'increase' : 'decrease'
	}
	products.value.unshift(newProduct)
	showAddModal.value = false
}

const handleTabChange = (tab) => {
	currentTab.value = tab
	selectedItems.value.clear()
}
</script>

<style scoped>
@keyframes flip-and-wait {
	0% { transform: rotateY(0); }
	8% { transform: rotateY(-180deg); }
	29% { transform: rotateY(-180deg); }
	37% { transform: rotateY(0); }
	100% { transform: rotateY(0); }
}

.is-animating {
	animation: flip-and-wait 4.8s infinite ease-in-out;
}
</style>