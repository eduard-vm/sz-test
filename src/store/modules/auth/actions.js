import { auth } from '@/http'
import request from '@/http/request'
import router from '@/router'

import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config'
import * as types from './mutation-types'

export default {
    logout() {
        delete request.defaults.headers.common['Authorization']
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        localStorage.removeItem(AUTH_TOKEN_KEY)
        router.push({ name: 'Login' })
    },

    async login({ commit }, payload) {
        try {
            /** Ресет ошибок */
            commit(types.SET_ERROR, {
                auth: null,
            })
            /** В положение ожидания */
            commit(types.SET_LOADING, { auth: true })
            const { data } = await auth.login(payload)
            localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
            localStorage.setItem(AUTH_TOKEN_KEY, data.access)
            return true
        } catch (exception) {
            if (exception.response) {
                const { status, data } = exception.response
                if (status === 400 || status === 401) {
                    commit(types.SET_ERROR, {
                        auth: data,
                    })
                } else {
                    commit(types.SET_ERROR, {
                        auth: 'Неизвестная ошибка',
                    })
                }
            }
        } finally {
            commit(types.SET_LOADING, { auth: false })
        }
    },

    async refreshToken() {},
}
