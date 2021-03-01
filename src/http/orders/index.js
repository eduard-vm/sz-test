import request from '../request'

export default {
    getAll(params) {
        return request.get('/zonesmart/order/', { params })
    },
}
