import * as types from './mutation-types'
const setStateFromValueMap = (state, valuesMap) =>
    Object.keys(valuesMap).forEach(k => (state[k] = valuesMap[k]))

export default {
    /** TODO: в общий метод */
    [types.SET_LOADING](state, loading = {}) {
        setStateFromValueMap(state.loading, loading)
    },

    /** TODO: в общий метод */
    [types.SET_ERROR](state, errors = {}) {
        setStateFromValueMap(state.errors, errors)
    },

    [types.SET_PAGINATION](state, pagination) {
        state.pagination = {
            ...state.pagination,
            ...pagination,
        }
    },

    [types.SET_ORDERS](state, orders) {
        state.orders = Object.freeze(orders)
    },
}
