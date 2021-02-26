<template lang="pug">
  .page
    form(@submit.prevent id="loginForm")
      input(
          type="text"
          v-model.trim="form.email"
          id="loginForm__email"
          name="loginForm__email"
          :class="{ error: hasError('email') }"
        ).input
      input(
          type="password"
          v-model.trim="form.password"
          id="loginForm__password"
          name="passwordForm__login"
        ).input
      button(type="button" @click="loginHandler").btn Вход
      .alert.alert--error
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
