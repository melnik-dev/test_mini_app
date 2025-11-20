<template lang="pug">
.flex.flex-1.items-center.justify-center.p-4
	// Карточка
	.max-w-md.w-full.p-8.rounded-2xl.shadow-xl.text-center.bg-white(class="dark:bg-slate-900")

		// Иконка
		.mb-6
			.w-20.h-20.rounded-full.bg-blue-900.flex.items-center.justify-center.mx-auto(class="dark:bg-blue-700")
				i.pi.pi-key.text-blue-50.text-4xl(class="dark:text-white")

		// Заголовок
		h1.text-2xl.font-bold.mb-4 Необходима авторизация

		// Текст
		p.text-slate-600.mb-6(class="dark:text-slate-300")
			| Для доступа к этому сервису необходимо авторизоваться через Telegram Mini App.
			| Пожалуйста, откройте это приложение через Telegram для продолжения.

		// Инфоблок
		.rounded-lg.p-4.mb-6.bg-blue-50.text-blue-700(class="dark:bg-blue-900/30 dark:text-blue-300")
			.flex.items-center.justify-center.space-x-2
				i.pi.pi-info-circle.text-lg
				span.text-sm.font-medium Доступно только в Telegram

		Button(
			label="Открыть в Telegram"
			icon="pi pi-send"
			@click="openInTelegram"
			class="w-full justify-center"
		)
</template>


<script setup>
	import {Button} from "primevue";

	import { ref } from "vue";

	const openInTelegram = () => {
		// Логика открытия в Telegram
		window.open('https://t.me/your_bot', '_blank');
	}
</script>