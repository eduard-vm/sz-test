import Vue from 'vue'
import VueRouter from 'vue-router'
import { AUTH_TOKEN_KEY } from '@/config'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginPage.vue'),
    },
    {
        path: '/',
        component: () => import('../layouts/Default.vue'),
        meta: {
            isProtected: true,
        },
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('../views/Orders.vue'),
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    const isAuth = localStorage.getItem(AUTH_TOKEN_KEY)

    if (to.name === 'Login' && isAuth) {
        return next('/')
    }

    if (to.meta && to.meta.isProtected && !isAuth) {
        return next('/login')
    }

    next()
})

export default router
