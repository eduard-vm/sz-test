import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
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
        name: 'Home',
        meta: {
            isProtected: true,
        },
        component: Home,
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
