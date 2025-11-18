<template lang="pug">
router-view
</template>

<script setup>
	import {useRouter} from "vue-router";
	import {useAuth} from "@/config/stores/auth.js";

	const storeAuth = useAuth()
	const router = useRouter()

	router.beforeEach(async (to, from, next) => {
		const token = localStorage.getItem('userToken')
		if(token) {
			// await storeAuth.setAuth(token)
		}
		if (to.meta.auth) {
			if (!storeAuth.getToken) return next('/')
			const withRole = to.matched.find(r => r.meta.role)
			if (withRole && !withRole.meta.role.includes(storeAuth.getUserRole)) return next('/dashboard')
		}
		next()
	})

	const root = document.getElementsByTagName('html')[0]
	// root.classList.toggle('dark')
</script>

<style scoped>
</style>
