<template lang="pug">
    .sz-input
        input(v-bind="$attrs")
</template>

<script>
export default {
    name: 'SzInput',

    props: {
        type: String,
        value: String,
    },

    computed: {
        model: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            },
        },
    },
}
</script>
