<template lang="pug">
    .sz-sidebar
        .sz-sidebar__block
            img(src="../assets/svg/Zonesmart.svg")
        .sz-sidebar__block
            a(href="javascript: voide 0" @click="logout").text-white Выход
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'SzSidebar',

    methods: {
        ...mapActions({
            logout: 'auth/logout',
        }),
    },
}
</script>

<style lang="sass">
.sz-sidebar
    &__block
        padding: 20px
        box-sizing: border-box
</style>
