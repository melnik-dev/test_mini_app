<template lang="pug">
// Карточка товара
div(
	:class="[\
    'flex items-center p-4 rounded-xl border transition-all duration-200 select-none',\
    selected \
        ? 'bg-primary-50 dark:bg-primary-500/10 border-primary shadow-sm' \
        : 'bg-surface-0 border-surface-200 hover:border-surface-300 hover:shadow-sm'\
]"
)
	// 1. Чекбокс выбора
	.flex-shrink-0.mr-4
		Checkbox(
			v-model="isSelected"
			binary
			@click.stop
		)
	// 2. Изображение товара
	.flex-shrink-0.mr-4
		// Если есть URL картинки
		Image(
			v-if="product.imageUrl"
			:src="product.imageUrl"
			:alt="product.title"
			imageClass="w-14 h-14 rounded-lg object-cover bg-surface-100"
			preview
		)
		// Если нет URL заглушка
		.w-14.h-14.rounded-lg.bg-surface-100.flex.items-center.justify-center.text-surface-400(v-else)
			ImageOff(:size="24")
	// 3. Инфо о товаре
	.flex-1.min-w-0.space-y-1
		// Заголовок
		a.block.text-base.font-medium.text-surface-900.truncate.cursor-pointer.transition-colors(
			@click.prevent="$_mini_lk_listItem_openProductLink"
			class="hover:text-primary hover:underline underline-offset-2"
		) {{ product.title }}
		// Цены
		.flex.flex-col.gap-1
	.flex.flex-col
		// Старая цена (secondary text)
		span.text-sm.text-surface-500
			| Начальная: {{ formatPrice(product.initialPrice) }}
		// Текущая цена (highlighted)
		.flex.items-center.gap-2
			span.text-sm.text-surface-500 Текущая:
			span.text-lg.font-bold.text-green-600.dark_text-green-400 {{ formatPrice(product.currentPrice) }}
			// Тренды цены (показываем если включено)
			.flex.items-center(v-if="showPriceChange")
				TrendingUp.text-red-500(v-if="product.priceChange === 'increase'" :size="16")
				TrendingDown.text-green-500(v-else-if="product.priceChange === 'decrease'" :size="16")
	// 4. Действия
	.flex.flex-col.gap-1.ml-2
		// Кнопка копировать
		Button(
			icon="pi pi-copy"
			text
			rounded
			severity="secondary"
			aria-label="Copy"
			@click="copyArticleNumber(product.articleNumber)"
			class="!w-8 !h-8 !p-0 text-surface-400 hover:text-surface-600"
		)
		// Кнопка удалить
		Button(
			icon="pi pi-trash"
			text
			rounded
			severity="danger"
			aria-label="Delete"
			@click="$emit('delete', product.id)"
			class="!w-8 !h-8 !p-0 hover:bg-red-50 dark_hover_bg-red-900/20"
		)
</template>

<script setup>
	import { Checkbox, Button, Image } from 'primevue';
	import { TrendingUp, TrendingDown, ImageOff } from 'lucide-vue-next';
	import {computed} from "vue";

	const props = defineProps({
		product: {
			type: Object,
			required: true
		},
		selected: {
			type: Boolean,
			default: false
		},
		showPriceChange: {
			type: Boolean,
			default: false
		}
	});

	const emit = defineEmits(['update:selected', 'delete']);

	// Функция для открытия ссылки
	function $_mini_lk_listItem_openProductLink() {
		console.log('Opening product link:', props.product.title);
	}

	const copyArticleNumber = (articleNumber) => {
		navigator.clipboard.writeText(articleNumber)
	}

	// Обертка для v-model чекера
	const isSelected = computed({
		get: () => props.selected,
		set: (val) => emit('update:selected', props.product.id) // Или передаем val, зависит от логики родителя
	});

	// Форматирование цены
	const formatPrice = (price) => `$${price.toFixed(2)}`;
</script>