<template lang="pug">
//  Используем bg-surface-0 и text-surface-900.
//  Благодаря Tgm.js и CSS переменным, они сами покрасятся:
//  - В светлой теме: белый фон, черный текст
//  - В темной теме: темный фон, белый текст
// Не нужно писать class="dark:..." для базовых вещей.
main.flex.flex-col.min-h-screen.m-0.bg-surface-0.text-surface-900
	//- Toast notifications глобально
	//- ConfirmDialog глобально
	Toast
	ConfirmDialog
	router-view
button(
	@click="toggleTheme"
	class="fixed top-4 right-4 z-50 p-2 rounded-full shadow-lg border transition-colors cursor-pointer bg-surface-0 border-surface-200 text-surface-600 hover:bg-surface-100 hover:text-primary"
)
	Sun(v-if="isDark" :size="20")
	Moon(v-else :size="20")
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import { useRouter } from "vue-router";
	import { useAuth } from "@/config/stores/auth.js";
	import { Moon, Sun } from 'lucide-vue-next';
	import Toast from 'primevue/toast';
	import ConfirmDialog from 'primevue/confirmdialog';

	const storeAuth = useAuth();
	const router = useRouter();
	const isDark = ref(false);

	// Инициализация темы (работает и в TG, и в браузере)
	const initTheme = () => {
		const tg = window.Telegram?.WebApp;
		const isTgAvailable = tg && tg.initData; // Проверка, что мы реально в Телеграме

		// 1. Определяем параметры темы
		let themeParams = {};
		let colorScheme = 'light';

		if (isTgAvailable) {
			// Если в Telegram - берем его цвета
			themeParams = tg.themeParams;
			colorScheme = tg.colorScheme;
		} else {
			// Если в браузере - берем локальные настройки или дефолт
			const savedTheme = localStorage.getItem('theme');
			const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

			if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
				colorScheme = 'dark';
				// Эмуляция цветов темной темы Telegram для браузера
				themeParams = {
					bg_color: '#17212b',
					secondary_bg_color: '#232e3c',
					text_color: '#f5f5f5',
					hint_color: '#6c7883',
					link_color: '#62bcf9',
					button_color: '#3390ec',
					button_text_color: '#ffffff',
				};
			} else {
				// Эмуляция цветов светлой темы
				themeParams = {
					bg_color: '#ffffff',
					secondary_bg_color: '#f1f1f1',
					text_color: '#000000',
					hint_color: '#999999',
					link_color: '#2481cc',
					button_color: '#3390ec',
					button_text_color: '#ffffff',
				};
			}
		}

		// 2. Применяем CSS переменные
		const root = document.documentElement;
		const colors = {
			'--tg-theme-bg-color': themeParams.bg_color || '#ffffff',
			'--tg-theme-secondary-bg-color': themeParams.secondary_bg_color || '#f1f1f1',
			'--tg-theme-text-color': themeParams.text_color || '#000000',
			'--tg-theme-hint-color': themeParams.hint_color || '#999999',
			'--tg-theme-link-color': themeParams.link_color || '#2481cc',
			'--tg-theme-button-color': themeParams.button_color || '#3390ec',
			'--tg-theme-button-text-color': themeParams.button_text_color || '#ffffff',
		};

		Object.entries(colors).forEach(([key, value]) => {
			root.style.setProperty(key, value);
		});

		// 3. Переключаем класс .dark для Tailwind
		if (colorScheme === 'dark') {
			root.classList.add('dark');
			isDark.value = true;
		} else {
			root.classList.remove('dark');
			isDark.value = false;
		}

		// Настройка UI Телеграма (цвет хедера)
		if (isTgAvailable) {
			tg.setHeaderColor(themeParams.secondary_bg_color || '#f1f1f1');
			tg.setBackgroundColor(themeParams.bg_color || '#ffffff');
		}
	};

	// Ручное переключение (для тестов в браузере)
	const toggleTheme = () => {
		const newTheme = isDark.value ? 'light' : 'dark';
		localStorage.setItem('theme', newTheme);

		// Если мы в реальном TG, мы не должны менять тему вручную через localStorage,
		// но для разработки это удобно.
		// Перезапускаем initTheme, чтобы применились новые "фейковые" цвета
		// (так как window.Telegram.WebApp.themeParams мы подменяем логикой выше)

		// Если не в TG - перезапускаем initTheme для обновления цветов
		if (!window.Telegram?.WebApp?.initData) {
			initTheme(); // Обновляем тему без перезагрузки страницы
		} else {
			// В реальном TG просто тоглим класс (цвета не поменяются, т.к. они от TG зависят)
			// Но все равно нужно обновить классы на обоих элементах для PrimeVue
			const root = document.documentElement;
			root.classList.toggle('dark');
			isDark.value = !isDark.value;
		}
	};

	onMounted(() => {
		// Инициализация
		window.Telegram?.WebApp?.ready();
		window.Telegram?.WebApp?.expand();

		initTheme();

		// Слушатель изменений темы из самого Telegram
		window.Telegram?.WebApp?.onEvent('themeChanged', initTheme);
	});
	// router.beforeEach(async (to, from, next) => {
	// 	const token = localStorage.getItem('userToken')
	// 	if(token) {
	// 		// await storeAuth.setAuth(token)
	// 	}
	// 	if (to.meta.auth) {
	// 		if (!storeAuth.getToken) return next('/')
	// 		const withRole = to.matched.find(r => r.meta.role)
	// 		if (withRole && !withRole.meta.role.includes(storeAuth.getUserRole)) return next('/dashboard')
	// 	}
	// 	next()
	// })
</script>