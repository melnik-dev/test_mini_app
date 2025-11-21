<template lang="pug">
.flex.flex-1.items-center.justify-center.p-4
	// Вместо bg-white и dark:bg-slate-900 используем bg-surface-0
	// Он сам станет белым в светлой теме и темным в темной (настроено в Tgm.js)
	.max-w-md.w-full.p-8.rounded-2xl.shadow-xl.text-center.bg-surface-0
		// Иконка
		.mb-6
			// bg-primary - возьмет синий цвет кнопки из темы TG
			.w-20.h-20.rounded-full.bg-primary.flex.items-center.justify-center.mx-auto
				// text-primary-contrast - белый текст
				i.pi.pi-key.text-primary-contrast.text-4xl
		// Заголовок (text-surface-900 - основной цвет текста)
		h1.text-2xl.font-bold.mb-4.text-surface-900 Необходима авторизация

		// Текст (text-surface-500 - вторичный цвет текста, "hint")
		p.text-surface-500.mb-6
			| Для доступа к этому сервису необходимо авторизоваться через Telegram Mini App.
			| Пожалуйста, откройте это приложение через Telegram для продолжения.
		// Инфоблок
		// bg-surface-50 - вторичный фон (светло-серый / темно-серый)
		.rounded-lg.p-4.mb-6.bg-surface-50.text-primary
			.flex.items-center.justify-center.space-x-2
				i.pi.pi-info-circle.text-lg
				span.text-sm.font-medium Доступно только в Telegram
		Button(
			label="Открыть в Telegram"
			icon="pi pi-send"
			@click="$_mini_index_openInTelegram"
			class="w-full justify-center"
		)
</template>

<script setup>
	import {Button} from "primevue";

	function $_mini_index_openInTelegram() {
		window.open('https://t.me/your_bot', '_blank');
	}
</script>