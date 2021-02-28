import { AUTH_TOKEN_KEY } from '@/config'

export default {
    isAuth() {
        return Boolean(localStorage.getItem(AUTH_TOKEN_KEY))
    },
}
