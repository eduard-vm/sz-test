import { auth } from '@/http'
import * as types from './mutation-types'

export default {
    async login({ commit }, payload) {
        try {
            /** Ресет ошибок */
            commit(types.SET_ERROR, {
                auth: null,
            })
            /** В положение ожидание */
            commit(types.SET_LOADING, { auth: true })

            const res = await auth.login(payload)
            console.log(res)
        } catch (exception) {
            if (exception.response) {
                console.log(exception.response)
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
}
