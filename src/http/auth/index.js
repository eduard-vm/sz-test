import request from '../request'

export default {
    /**
     * 
     * Авторизация (создание пары токенов):
     * POST: https://zonesmart.su/api/v1/auth/jwt/create/
        Body: {
            email: String,
            password: String
        }
     */

    login(reqBody) {
        return request.post('/auth/jwt/create/', reqBody)
    },

    refresh(refresh) {
        return request.post('/auth/jwt/refresh/', { refresh })
    },
}
