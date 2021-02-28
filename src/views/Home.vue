<template lang="pug">
    #home
        sz-button(@click="logout") Выход
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Home',
    methods: {
        ...mapActions({
            logout: 'auth/logout',
        }),
    },
}
</script>
