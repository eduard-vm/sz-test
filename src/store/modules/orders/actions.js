import { orders } from '@/http'
import * as types from './mutation-types'

export default {
    async getAll({ commit, state }, params) {
        try {
            /** Ресет ошибок */
            commit(types.SET_ERROR, {
                all: null,
            })
            /** В положение ожидания */
            commit(types.SET_LOADING, { all: true })

            const { data } = await orders.getAll({
                limit: params.limit,
                offset: params.limit * params.page,
                search: params.search,
            })

            const total_pages = Math.ceil(data.count / state.pagination.limit)

            commit(types.SET_ORDERS, data.results)
            commit(types.SET_PAGINATION, {
                limit: params.limit,
                offset: params.offset,
                search: params.search,
                count: data.count,
                page: params.page,
                total_pages,
            })

            return data
        } catch (exception) {
            console.log(exception)
            if (exception.response) {
                const { data } = exception.response
                commit(types.SET_ERROR, {
                    all: data,
                })
            }
        } finally {
            commit(types.SET_LOADING, { all: false })
        }
    },

    async refreshToken() {},
}
