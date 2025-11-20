<template lang="pug">
main.flex.flex-col.min-h-screen.m-0.bg-surface-50.text-surface-900.px-4(class="dark:bg-dark-ground dark:text-surface-100")
	router-view
button(
	@click="toggleTheme"
	class="fixed top-4 right-4 z-10 p-2 rounded-full shadow-sm border transition-colors bg-light-card text-surface-600 hover:bg-surface-100 border-light dark:bg-dark-card dark:border-dark dark:text-primary-400 dark:hover:bg-surface-800"
)
	Sun(v-if="isDark" :size="20")
	Moon(v-else :size="20")
</template>

<script setup>
	import {useRouter} from "vue-router";
	import {useAuth} from "@/config/stores/auth.js";
	import { Moon, Sun } from 'lucide-vue-next';

	const storeAuth = useAuth()
	const router = useRouter()

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

	const root = document.getElementsByTagName('html')[0]
	root.classList.toggle('dark')
	import { ref, onMounted } from 'vue';



	const isDark = ref(false);

	const toggleTheme = () => {
		const root = document.documentElement
		root.classList.toggle('dark')
		isDark.value = root.classList.contains('dark')
	}

	onMounted(() => {
		isDark.value = document.documentElement.classList.contains('dark');
	});
</script>

<style >

</style>
