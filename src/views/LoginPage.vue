<template lang="pug">
  .page
    form(@submit.prevent id="loginForm")
      input(
          type="text"
          v-model.trim="login"
          id="loginForm__login"
          name="loginForm__login"
        ).input
      input(
          type="password"
          v-model.trim="password"
          id="loginForm__password"
          name="passwordForm__login"
        ).input
      button(type="button" @click="loginHandler").btn Вход
</template>

<script>
export default {
    name: 'LoginPage',

    data() {
        return {
            login: null,
            password: null,
        }
    },

    methods: {
        serializeForm() {
            return {
                login: this.login,
                password: this.password,
            }
        },
        loginHandler() {},
    },
}
</script>
