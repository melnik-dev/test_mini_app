import {createRouter, createWebHistory} from 'vue-router'
import {useAuth} from "@/config/stores/auth.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/components/index/MiniIndex.vue'),
            meta: {
                auth: false
            },
        },
        {
            path: '/lk',
            redirect: '/lk/list',
            name: 'lk',
            meta: {
                // auth: true,
            },
            component: () => import('@/components/lk/MiniLkIndex.vue'),
            children: [
                {
                    path: 'list',
                    name: 'lkList',
                    component: () => import('@/components/lk/product/MiniLkProduct.vue'),
                },
            ]
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/components/404/MiniErrorIndex.vue'),
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
