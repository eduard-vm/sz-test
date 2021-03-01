export default {
    loading(state) {
        return Object.values(state.loading).some(Boolean)
    },
}
