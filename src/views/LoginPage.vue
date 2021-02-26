<template lang="pug">
  .page
    form(@submit.prevent id="loginForm")
      input(
          type="text"
          v-model.trim="form.login"
          id="loginForm__login"
          name="loginForm__login"
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
// test@zonesmart.ru
// 4815162342test
export default {
    name: 'LoginPage',

    data() {
        return {
            form: {
                login: null,
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
            console.log(this.loginErrors)
            return this.loginErrors
        },
    },

    methods: {
        ...mapActions({
            authLogin: 'auth/login',
        }),

        serializeForm() {
            return {
                login: this.form.login,
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
