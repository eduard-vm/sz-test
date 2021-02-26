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
            // console.error(exception)
            commit(types.SET_ERROR, {
                auth: exception,
            })
        } finally {
            commit(types.SET_LOADING, { auth: false })
        }
    },
}
