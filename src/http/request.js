import axios from 'axios'
import router from '@/router'

import {
    BASE_URL,
    AUTH_TOKEN_KEY,
    REQUEST_TIMEOUT,
    REFRESH_TOKEN_KEY,
} from '@/config'

const request = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
        common: {
            Accept: 'application/json',
        },
    },
})

request.interceptors.request.use(
    config => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)
        if (token) {
            config.headers = {
                Authorization: `JWT ${token}`,
            }
        }
        return config
    },
    error => Promise.reject(error)
)

function createResponseInterceptor() {
    const responseInterceptor = request.interceptors.response.use(
        response => response,
        error => {
            console.log(error)
            if (error.response.status !== 401) {
                return Promise.reject(error)
            }

            request.interceptors.response.eject(responseInterceptor)

            return request
                .post('/auth/jwt/refresh/', {
                    refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
                })
                .then(response => {
                    localStorage.removeItem(
                        REFRESH_TOKEN_KEY,
                        response.data.refresh
                    )
                    localStorage.removeItem(
                        AUTH_TOKEN_KEY,
                        response.data.access
                    )
                    error.response.config.headers[
                        'Authorization'
                    ] = `JWT ${response.data.access}`
                    return axios(error.response.config)
                })
                .catch(error => {
                    localStorage.removeItem(REFRESH_TOKEN_KEY)
                    localStorage.removeItem(AUTH_TOKEN_KEY)
                    router.push({ name: 'Login' })
                    return Promise.reject(error)
                })
                .finally(createResponseInterceptor)
        }
    )
}

createResponseInterceptor()

export default request
