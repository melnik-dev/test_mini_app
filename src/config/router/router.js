import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from "@/config/stores/auth.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/components/index/ShoIndex.vue'),
            meta: {
                auth: false
            },
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            meta: {
                auth: true,
            },
            component: () => import('@/components/dashboard/ShoDashboardIndex.vue'),
            redirect: function () {
                const store = useAuth()
                return store.getUserRole === 0 ? { name: 'settings' } : { name: 'profile' }
            },
            children: []
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/components/404/ShoErrorIndex.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        else return {top: 0};
    }
})

export default router
