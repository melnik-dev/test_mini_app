<template lang="pug">
//- Контейнер (обычно внутри Drawer или Dialog)
.flex.flex-col.gap-1
	//- Заголовок секции
	h3.mb-2.text-sm.font-medium.px-2.mt-4(class="text-[var(--tg-theme-link-color)]") Выберите маркетплейс
	.flex.flex-col.gap-4.p-4
		//- Блок выбора маркетплейса (Радиокнопки в строчку)
		.flex.items-center.gap-6
			//- Опция 1: WB
			.flex.items-center.gap-2
				RadioButton(
					v-model="form.marketplace"
					inputId="mp-wb"
					name="marketplace"
					value="wb"
				)
				label(for="mp-wb" class="cursor-pointer text-[var(--tg-theme-text-color)]") Wildberries

			//- Опция 2: Ozon
			.flex.items-center.gap-2
				RadioButton(
					v-model="form.marketplace"
					inputId="mp-ozon"
					name="marketplace"
					value="ozon"
				)
				label(for="mp-ozon" class="cursor-pointer text-[var(--tg-theme-text-color)]") Ozon

		//- Поле ввода артикула (под ним)
		.flex.flex-col.gap-2
			label(for="sku-input" class="text-sm font-medium text-[var(--tg-theme-hint-color)]") Артикул товара
			InputNumber(
				v-model="form.sku"
				inputId="sku-input"
				placeholder="Введите артикул"
				:useGrouping="false"
				:pt="{ root: { class: 'w-full' }, input: { class: 'w-full !bg-[var(--tg-theme-secondary-bg-color)] !border-none !rounded-xl !py-3 !pl-4 text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)]/50 focus:ring-2 focus:ring-[var(--tg-theme-link-color)]' } }"
			)

	h3.mb-2.text-sm.font-medium.px-2(class="text-[var(--tg-theme-link-color)]") Получать уведомления
	//- Группа настроек (список)
	.flex.flex-col
		//- Пункт 1
		MiniUiToggleLabel(v-model="form.priceDrop" label="При снижении цены")
		//- Пункт 2
		.flex.items-center.justify-between.py-3.border-b.px-4(class="border-[var(--tg-theme-hint-color)]/20")
			span(class="text-[var(--tg-theme-text-color)]") Если цена снизится до
			.flex.flex-col.items-end.gap-1
				//- Инпут цены
				//- !bg-transparent и классы Tailwind нужны чтобы перебить дефолтные стили и сделать "как на картинке"
				InputNumber(
					v-model="form.targetPrice"
					mode="currency"
					currency="RUB"
					locale="ru-RU"
					placeholder="1 000 ₽"
					:disabled="!isPremium"
					:pt="{ input: { class: '!bg-[var(--tg-theme-secondary-bg-color)] !border-none !text-right !rounded-xl !py-2 disabled:!opacity-70 disabled:!text-[var(--tg-theme-hint-color)]' } }"
				)
				//- Подпись с замком (Premium)
				div(v-if="!isPremium" class="flex items-center gap-1 opacity-60")
					i.pi.pi-lock(class="text-[10px]")
					span(class="text-[10px]") Доступно с премиум тарифом

		//- Пункт 3
		MiniUiToggleLabel(v-model="form.priceIncrease" label="При увеличении цены")
		//- Пункт 4
		MiniUiToggleLabel(v-model="form.outOfStock" label="Товар закончился")
		//- Пункт 5
		MiniUiToggleLabel(v-model="form.backInStock" label="Товар появился")
		//- Пункт 6
		MiniUiToggleLabel(v-model="form.lowStock" label="Осталось меньше 10 единиц")
	//- Кнопка внизу (отступ mt-6)
	Button.mt-6.w-full.px-2(
		label="Начать следить"
		rounded
		size="large"
		@click="handleSave"
	)
</template>

<script setup>
	import { ref } from 'vue';
	import ToggleSwitch from 'primevue/toggleswitch';
	import InputNumber from 'primevue/inputnumber';
	import Button from 'primevue/button';
	import RadioButton from 'primevue/radiobutton';
	import MiniUiToggleLabel from "@/components/ui/MiniUiToggleLabel.vue";
	const isPremium = ref(false); // Флаг премиума для теста

	const form = ref({
		priceDrop: true,
		targetPrice: null,
		priceIncrease: true,
		outOfStock: true,
		backInStock: true,
		lowStock: true,
		marketplace: 'wb',
		sku: null
	});

	const handleSave = () => {
		console.log('Settings saved:', form.value);
	};
</script>
