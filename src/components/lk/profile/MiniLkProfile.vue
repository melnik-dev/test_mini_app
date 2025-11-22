<template lang="pug">
//- Основной контейнер страницы
.flex.flex-col.items-center.p-6.min-h-screen.space-y-8

	//- Блок приветствия
	.flex.flex-col.items-center.space-y-4.mt-10
		//- Аватарка (или заглушка)
		.relative.w-24.h-24.rounded-full.overflow-hidden.shadow-lg(class="bg-[var(--tg-theme-secondary-bg-color)]")
			img(
				v-if="user?.photo_url"
				:src="user.photo_url"
				alt="Avatar"
				class="w-full h-full object-cover"
			)
			//- Иконка-заглушка, если нет фото
			.flex.items-center.justify-center.w-full.h-full(v-else)
				i.pi.pi-user(class="text-4xl text-[var(--tg-theme-hint-color)]")

		//- Приветствие
		.text-center
			h1(class="text-2xl font-bold text-[var(--tg-theme-text-color)]") Добрый день, {{ user?.first_name || 'Пользователь' }}!
			p(class="text-sm text-[var(--tg-theme-hint-color)] mt-1") @{{ user?.username || 'username' }}

	//- Карточка "О боте"
	.w-full.rounded-2xl.p-5.shadow-sm(class="bg-[var(--tg-theme-secondary-bg-color)]")
		h2(class="text-lg font-semibold mb-3 text-[var(--tg-theme-link-color)] flex items-center gap-2")
			i.pi.pi-info-circle
			| О боте

		p(class="text-[var(--tg-theme-text-color)] leading-relaxed text-sm")
			| Этот бот помогает вам следить за ценами и наличием товаров на маркетплейсах.

		//- Список возможностей
		ul.mt-4.space-y-3
			li.flex.items-start.gap-3
				i.pi.pi-chart-line(class="mt-1 text-green-500")
				span(class="text-sm text-[var(--tg-theme-text-color)]") Уведомления о снижении и повышении цены

			li.flex.items-start.gap-3
				i.pi.pi-box(class="mt-1 text-orange-500")
				span(class="text-sm text-[var(--tg-theme-text-color)]") Контроль наличия: товар закончился или появился

			li.flex.items-start.gap-3
				i.pi.pi-exclamation-circle(class="mt-1 text-red-500")
				span(class="text-sm text-[var(--tg-theme-text-color)]") Предупреждение, если товара осталось мало

	//- Футер (версия)
	.mt-auto.pb-4
		span(class="text-xs text-[var(--tg-theme-hint-color)] opacity-50") Версия 1.0.0
</template>

<script setup>
	import { ref, onMounted } from 'vue';

	// Данные пользователя
	const user = ref(null);

	onMounted(() => {
		// Пытаемся достать данные из Telegram WebApp
		if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
			user.value = window.Telegram.WebApp.initDataUnsafe.user;
		} else {
			// Фейковые данные для теста в браузере
			user.value = {
				first_name: 'Алексей',
				username: 'alex_dev',
				photo_url: '' // Пустое, покажется иконка
			};
		}
	});
</script>
