<template lang="pug">
    .sz-input(:style="input_style")
        input(v-bind="$attrs" v-model="model" ref="input")
        .sz-input__password-show-icon(v-if="is_password_input")
            .icon.icon--ey(@mousedown="show_pass = true" @mouseup="show_pass = false")
</template>

<script>
export default {
    name: 'SzInput',

    inheritAttrs: false,

    props: {
        value: String,
        width: {
            type: String,
            default: 'auto',
        },
    },

    data() {
        return {
            show_pass: false,
        }
    },

    watch: {
        show_pass(show) {
            this.$refs.input.type = show ? 'text' : 'password'
        },
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

        is_password_input() {
            return this.$attrs.type === 'password'
        },

        input_style() {
            return {
                width: this.width,
            }
        },
    },
}
</script>
