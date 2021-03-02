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
                :disabled="login_loading"
                placeholder="E-mail или телефон"
                :class="{ error: hasError('email') }"
                )
            sz-input(
                type="password"
                :disabled="login_loading"
                v-model.trim="form.password"
                id="loginForm__password"
                name="passwordForm__login"
                placeholder="Пароль"
                ).m-y3
            sz-button(@click="loginHandler" :loading="login_loading").m-y3 Вход
            sz-alert(type="error").m-y1
                | {{ auth_error }}
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
            login_loading: ({ auth }) => auth.loading.auth,
            login_errors: ({ auth }) => auth.errors.auth,
        }),

        disabled() {
            return this.login_loading
        },

        auth_error() {
            if (this.login_errors) {
                const e = this.login_errors

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
            if (this.login_errors) {
                return Object.keys(this.login_errors).includes(field)
            }
            return false
        },

        serializeForm() {
            return {
                email: this.form.email,
                password: this.form.password,
            }
        },

        async loginHandler() {
            await this.authLogin(this.serializeForm())
            this.$router.push({ name: 'Home' })
        },
    },
}
</script>

<style lang="sass">
.page-login
    padding-top: 60px
    &__logo
        display: block
        margin: 0 auto 105px auto
.login-card
    width: 407px
    margin: 0 auto
</style>
