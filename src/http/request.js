import axios from 'axios'
import { BASE_URL, REQUEST_TIMEOUT } from '@/config'

console.log(BASE_URL)

const request = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
        common: {
            Accept: 'application/json',
        },
    },
})

/** TODO: Реализую перехватчики для авторизации */
// axios.interceptors.response.use()

export default request
