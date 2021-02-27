<template lang="pug">
  .page.page-login
    img(src="../assets/svg/logo-light-bg.svg").page-login__logo
    sz-card(title="Вход").login-card
        form(@submit.prevent id="loginForm")
            sz-input(
                type="text"
                v-model.trim="form.email"
                id="loginForm__email"
                name="loginForm__email"
                autocomplete="off"
                placeholder="E-mail или телефон"
                :class="{ error: hasError('email') }"
                )
            sz-input(
                type="password"
                autocomplete="off"
                v-model.trim="form.password"
                id="loginForm__password"
                name="passwordForm__login"
                placeholder="Пароль"
                ).m-y3
            sz-button(@click="loginHandler").m-y3 Вход
            sz-alert(type="error").m-y1
                | {{ authError }}
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'LoginPage',

    data() {
        return {
            form: {
                email: null,
                password: null,
            },
        }
    },

    computed: {
        ...mapState({
            loginLoading: ({ auth }) => auth.loading.auth,
            loginErrors: ({ auth }) => auth.errors.auth,
        }),

        authError() {
            if (this.loginErrors) {
                const e = this.loginErrors

                if (typeof e === 'string') {
                    return e
                } else if (Array.isArray(e)) {
                    return e.join('\n')
                } else if (typeof e === 'object') {
                    return Object.keys(e)
                        .map(k => {
                            if (Array.isArray(e[k])) {
                                return `${k}: ${e[k].join('\n')}`
                            }
                            return e[k]
                        })
                        .join('\n')
                }
                return e
            }

            return null
        },
    },

    methods: {
        ...mapActions({
            authLogin: 'auth/login',
        }),

        hasError(field) {
            if (this.loginErrors) {
                return Object.keys(this.loginErrors).includes(field)
            }
            return false
        },

        serializeForm() {
            return {
                email: this.form.email,
                password: this.form.password,
            }
        },

        loginHandler() {
            const reqBody = this.serializeForm()
            this.authLogin(reqBody)
        },
    },
}
</script>

<style lang="sass">
.page-login
    &__logo
        margin: 60px auto 105px
.login-card
    width: 407px
    margin: 0 auto
</style>
